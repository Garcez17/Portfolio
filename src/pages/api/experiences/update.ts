import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import middleware from "../../../middlewares";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

const handler = nextConnect();

handler.use(middleware);

handler.post(async function (req: any, res: NextApiResponse) {
  const { title, description, start, end, experience_id } = req.body;

  const findExistentExperience = await prisma.experience.findUnique({
    where: {
      id: experience_id,
    }
  });

  if (!findExistentExperience) return res.status(404).json({ error: 'Experience not found.' });

  if (req.files.image) {
    const s3StorageProvider = new S3StorageProvider();

    await s3StorageProvider.deleteFile(findExistentExperience.image);

    const { originalFilename, newFilename, filepath, mimetype } = req.files.image;

    const fileName = `${newFilename}-${originalFilename}`;

    await s3StorageProvider.saveFile(fileName, filepath, mimetype);

    await prisma.experience.update({
      where: {
        id: findExistentExperience.id,
      },
      data: {
        image: fileName,
      }
    })
  }

  await prisma.experience.update({
    where: {
      id: findExistentExperience.id,
    },
    data: {
      title,
      description,
      start,
      end,
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