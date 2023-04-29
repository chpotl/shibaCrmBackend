import { Injectable } from '@nestjs/common';
import EasyYandexS3 from 'easy-yandex-s3';

@Injectable()
export class FilesService {
  private s3 = new EasyYandexS3({
    auth: {
      accessKeyId: process.env.YC_KEY,
      secretAccessKey: process.env.YC_SECRET_KEY,
    },
    Bucket: process.env.YC_BUCKET_NAME,
    debug: false,
  });

  async s3filesUpload(files: Array<Express.Multer.File>) {
    const payload: {
      buffer: Buffer;
    }[] = files.map((file): { buffer: Buffer } => {
      return {
        buffer: file.buffer,
      };
    });
    return await this.s3.Upload(payload, '/images/');
  }

  async s3filesDelete(url: string) {
    return await this.s3.Remove(url);
  }
}
