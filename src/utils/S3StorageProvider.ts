import fs from 'fs';
import path from 'path';
// import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

class DiskStorageProvider {
  // private client: S3;

  // constructor() {
  //   this.client = new aws.S3({
  //     region: 'us-east-1',
  //   });
  // }

  public async saveFile(file: string, filePath: string): Promise<string> {
    const originalPath = path.resolve('123');

    const ContentType = mime.getType(originalPath);
    const fileContent = await fs.promises.readFile(originalPath);
    console.log({ fileContent });

    // if (!ContentType) {
    //   throw new Error('File not found');
    // }


    // console.log(fileContent);
    // console.lo

    // await this.client
    //   .putObject({
    //     Bucket: uploadConfig.config.aws.bucket,
    //     Key: file,
    //     ACL: 'public-read',
    //     Body: fileContent,
    //     ContentType,
    //     ContentDisposition: `inline; filename=${file}`,
    //   })
    //   .promise();

    // await fs.promises.unlink(originalPath);

    return file;
  }

  // public async deleteFile(file: string): Promise<void> {
  //   await this.client
  //     .deleteObject({
  //       Bucket: uploadConfig.config.aws.bucket,
  //       Key: file,
  //     })
  //     .promise();
  // }
}

export { DiskStorageProvider };