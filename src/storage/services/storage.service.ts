import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { StorageConfig } from '../config/storage.config';

@Injectable()
export class StorageService {
  private readonly s3: S3Client;

  constructor(private readonly storageConfig: StorageConfig) {
    this.s3 = new S3Client(this.storageConfig.getConfig());
  }

  async uploadFile(file: Buffer): Promise<PutObjectCommandInput> {
    const params = await this.storageConfig.getFileParams(file);

    const command = new PutObjectCommand(params);

    try {
      await this.s3.send(command);

      return params;
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  }

  async getFileUrl(key: string): Promise<string> {
    const params = this.storageConfig.getFileConfig(key);

    return getSignedUrl(this.s3, params);
  }
}
