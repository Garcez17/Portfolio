import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

const handler = nextConnect();

handler.use(middleware);

handler.post(async function (req: any, res: NextApiResponse) {
  const { title, description, demo_url, repository_url, state, tags } = req.body;

  const { originalFilename, newFilename, filepath, mimetype } = req.files.image;

  const s3StorageProvider = new S3StorageProvider();

  const fileName = `${newFilename}-${originalFilename}`;

  await s3StorageProvider.saveFile(fileName, filepath, mimetype);

  const findTags = await prisma.tag.findMany({
    where: {
      name: {
        in: JSON.parse(tags),
      }
    }
  })

  await prisma.project.create({
    data: {
      title,
      description,
      image: fileName,
      state,
      demo_url,
      repository_url,
      tags: {
        createMany: {
          data: findTags.map(tag => ({ tag_id: tag.id })),
        }
      }
    }
  })

  return res.status(201).json({});
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;