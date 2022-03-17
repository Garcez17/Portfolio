import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, image } = req.body;

  const s3StorageProvider = new S3StorageProvider();

  await s3StorageProvider.deleteFile(image);

  const findExistentExperience = await prisma.project.findUnique({
    where: {
      id,
    }
  });

  if (!findExistentExperience) return res.status(404).json({ error: 'Experience not found.' });

  await prisma.project.delete({
    where: {
      id: findExistentExperience.id,
    }
  });

  return res.status(204).json({});
}