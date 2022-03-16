import fs from 'fs';
import aws, { S3 } from 'aws-sdk';

class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string, filePath: string, content_type: string): Promise<string> {
    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: 'app-portfolio-gz',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: content_type,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'app-portfolio-gz',
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };