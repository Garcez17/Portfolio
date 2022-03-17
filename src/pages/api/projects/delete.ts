import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, image } = req.body;

  const s3StorageProvider = new S3StorageProvider();

  await s3StorageProvider.deleteFile(image);

  const findExistentProject = await prisma.project.findUnique({
    where: {
      id,
    }
  });

  if (!findExistentProject) return res.status(404).json({ error: 'Project not found.' });

  await prisma.project.delete({
    where: {
      id: findExistentProject.id,
    }
  });

  return res.status(204).json({});
}