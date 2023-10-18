import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommandInput,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StorageConfig {
  constructor(private readonly configService: ConfigService) {}

  getConfig(): S3ClientConfig {
    return {
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    };
  }

  async getFileParams(file: Buffer): Promise<PutObjectCommandInput> {
    // TODO replace ContentType
    return {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: `${uuid()}`,
      Body: file,
      ContentType: 'image/png',
    };
  }

  getFileConfig(key: string): GetObjectCommand {
    return new GetObjectCommand({
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: key,
    });
  }
}
