import { Module } from '@nestjs/common';
import { DownloadsController } from './downloads.controller';
import { DownloadsService } from './downloads.service';

@Module({
  imports: [],
  controllers: [DownloadsController],
  providers: [DownloadsService],
})
export class DownloadsModule {}
