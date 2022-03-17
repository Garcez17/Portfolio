import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import middleware from "../../../middlewares";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

const handler = nextConnect();

handler.use(middleware);

handler.post(async function (req: any, res: NextApiResponse) {
  const { title, description, demo_url, repository_url, state, tags, project_id } = req.body;

  const findExistentProject = await prisma.project.findUnique({
    where: {
      id: project_id,
    }
  });

  if (!findExistentProject) return res.status(404).json({ error: 'Project not found.' });

  if (req.files.image) {
    const s3StorageProvider = new S3StorageProvider();

    await s3StorageProvider.deleteFile(findExistentProject.image);

    const { originalFilename, newFilename, filepath, mimetype } = req.files.image;

    const fileName = `${newFilename}-${originalFilename}`;

    await s3StorageProvider.saveFile(fileName, filepath, mimetype);

    await prisma.project.update({
      where: {
        id: findExistentProject.id,
      },
      data: {
        image: fileName,
      }
    })
  }

  const parsedTags = JSON.parse(tags) as string[];

  const findExistentTags = await prisma.projectTag.findMany({
    where: {
      project_id: findExistentProject.id,
    },
    include: {
      tag: true,
    }
  });

  const deletedTags = findExistentTags.filter(({ tag }) => {
    return !parsedTags.includes(tag!.name);
  });

  deletedTags.forEach(async project_tag => {
    await prisma.projectTag.delete({
      where: {
        id: project_tag.id,
      }
    })
  });

  parsedTags.forEach(async tag_name => {
    const existentNameTags = findExistentTags.map(({ tag }) => tag!.name);

    if (!existentNameTags.includes(tag_name)) {
      const tag = await prisma.tag.findFirst({
        where: {
          name: tag_name,
        }
      });

      await prisma.projectTag.create({
        data: {
          project_id: findExistentProject.id,
          tag_id: tag!.id,
        }
      })
    }
  })

  await prisma.project.update({
    where: {
      id: findExistentProject.id,
    },
    data: {
      title,
      description,
      state,
      demo_url,
      repository_url,
    }
  })

  return res.status(204).json({});
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;