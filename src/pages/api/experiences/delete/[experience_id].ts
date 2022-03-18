import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/prisma";
import { S3StorageProvider } from "../../../../utils/S3StorageProvider";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { experience_id } = req.query;

  const findExistentExperience = await prisma.experience.findUnique({
    where: {
      id: String(experience_id),
    }
  });

  if (!findExistentExperience) return res.status(404).json({ error: 'Experience not found.' });

  const s3StorageProvider = new S3StorageProvider();

  await s3StorageProvider.deleteFile(findExistentExperience.image);

  await prisma.experience.delete({
    where: {
      id: findExistentExperience.id,
    }
  });

  return res.json({});
}