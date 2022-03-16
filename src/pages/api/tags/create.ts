import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;

  const findExistentTag = await prisma.tag.findFirst({
    where: {
      name,
    }
  });

  if (findExistentTag) return res.status(403).json({ error: 'Tag already exists.' });

  await prisma.tag.create({
    data: {
      name,
    }
  });

  return res.status(201).json({});
}