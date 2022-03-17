import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import middleware from "../../../middlewares";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

const handler = nextConnect();

handler.use(middleware);

handler.post(async function (req: any, res: NextApiResponse) {
  const { title, description, start, end } = req.body;

  const { originalFilename, newFilename, filepath, mimetype } = req.files.image;

  const s3StorageProvider = new S3StorageProvider();

  const fileName = `${newFilename}-${originalFilename}`;

  await s3StorageProvider.saveFile(fileName, filepath, mimetype);

  await prisma.experience.create({
    data: {
      title,
      description,
      image: fileName,
      start,
      end,
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