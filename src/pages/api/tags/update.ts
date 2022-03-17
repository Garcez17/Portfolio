import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name, tag_id } = req.body;

  const findExistentTag = await prisma.tag.findUnique({
    where: {
      id: tag_id,
    }
  });

  if (!findExistentTag) return res.status(404).json({ error: 'Tag not found.' });

  await prisma.tag.update({
    where: {
      id: findExistentTag.id,
    },
    data: {
      name,
    }
  });

  return res.status(204).json({});
}