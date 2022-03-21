import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import middleware from "../../../middlewares";
import { prisma } from "../../../utils/prisma";
import { S3StorageProvider } from "../../../utils/S3StorageProvider";

const handler = nextConnect();

handler.use(middleware);

handler.post(async function (req: any, res: NextApiResponse) {
  const { email, github_username, name, phone_number, title, about, user_id } = req.body;

  const findExistentUser = await prisma.user.findUnique({
    where: {
      id: user_id,
    }
  });

  if (!findExistentUser) return res.status(404).json({ error: 'User not found.' });

  if (req.files.image) {
    const s3StorageProvider = new S3StorageProvider();

    await s3StorageProvider.deleteFile(findExistentUser.avatar);

    const { originalFilename, newFilename, filepath, mimetype } = req.files.image;

    const fileName = `${newFilename}-${originalFilename}`;

    await s3StorageProvider.saveFile(fileName, filepath, mimetype);

    await prisma.user.update({
      where: {
        id: findExistentUser.id,
      },
      data: {
        avatar: fileName,
      }
    })
  }

  await prisma.user.update({
    where: {
      id: findExistentUser.id,
    },
    data: {
      title,
      email,
      github_username,
      name,
      phone_number,
      about,
    }
  })

  return res.json({});
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;