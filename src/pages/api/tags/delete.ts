import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  const findExistentTag = await prisma.tag.findUnique({
    where: {
      id,
    }
  });

  if (!findExistentTag) return res.status(404).json({ error: 'Tag not found.' });

  await prisma.tag.delete({
    where: {
      id: findExistentTag.id,
    }
  });

  return res.status(204).json({});
}