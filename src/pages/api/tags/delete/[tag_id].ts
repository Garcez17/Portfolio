import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { tag_id } = req.query;

  const findExistentTag = await prisma.tag.findUnique({
    where: {
      id: String(tag_id),
    }
  });

  if (!findExistentTag) return res.status(404).json({ error: 'Tag not found.' });

  await prisma.projectTag.deleteMany({
    where: {
      tag: {
        id: findExistentTag.id,
      }
    }
  })

  await prisma.tag.delete({
    where: {
      id: findExistentTag.id,
    },
  });

  return res.json({});
}