import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/prisma";
import { S3StorageProvider } from "../../../../utils/S3StorageProvider";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { project_id } = req.query;

  const findExistentProject = await prisma.project.findUnique({
    where: {
      id: String(project_id),
    }
  });

  if (!findExistentProject) return res.status(404).json({ error: 'Project not found.' });

  const s3StorageProvider = new S3StorageProvider();

  await s3StorageProvider.deleteFile(findExistentProject.image);

  await prisma.projectTag.deleteMany({
    where: {
      project: {
        id: findExistentProject.id,
      }
    }
  })

  await prisma.project.delete({
    where: {
      id: findExistentProject.id,
    }
  });

  return res.json({});
}