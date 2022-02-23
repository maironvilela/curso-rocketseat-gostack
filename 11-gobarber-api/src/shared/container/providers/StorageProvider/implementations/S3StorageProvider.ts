import IStorageProvider from "../models/IStorageProvider";
import path from 'path';
import fs from 'fs';

import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

import uploadConfig from '@config/upload';

class S3StorageProvider implements IStorageProvider {

  private client: S3
  constructor() {
    this.client = new aws.S3({
      region: uploadConfig.config.aws.region,
    })
  }

  public async saveFile(file: string): Promise<string> {

    const filePath = path.resolve(uploadConfig.tmpFolder, file)

    //recupera o ContentType do arquivo
    const ContentType = mime.getType(filePath);
    console.log(ContentType)

    if (!ContentType) {
      throw new Error('Arquivo não encontrado')
    }

    const fileContent = await fs.promises.readFile(filePath, {})


    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    }).promise();

    return file;

  }
  public async deleteFile(file: string): Promise<void> {

    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    }).promise();
  }

}

export default S3StorageProvider;
