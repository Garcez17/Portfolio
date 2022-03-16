import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import middleware from "../../../middlewares";
import { DiskStorageProvider } from "../../../utils/S3StorageProvider";

const handler = nextConnect();

handler.use(middleware);

handler.post(async function (req: any, res: NextApiResponse) {
  const { title, description, demo_url, repository_url, state, tags } = req.body;
  const image = req.files.image.originalFilename;

  const s3StorageProvider = new DiskStorageProvider();

  await s3StorageProvider.saveFile(req.files.image.originalFilename, req.files.image.filepath);

  // console.log({ title, description, demo_url, repository_url, state, image, tags: JSON.parse(tags) });
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;