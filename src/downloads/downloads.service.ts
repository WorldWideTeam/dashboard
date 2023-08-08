import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloadsService {
  getViewName(): string {
    return 'index';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
