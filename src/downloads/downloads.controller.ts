import {
  Get,
  Controller,
  Res,
  UseGuards,
  UseFilters,
  Render,
} from '@nestjs/common';
import { Response } from 'express';
import { DownloadsService } from './downloads.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ViewAuthFilter } from 'src/auth/view-auth.filter';

@Controller('downloads')
export class DownloadsController {
  constructor(private appService: DownloadsService) {}

  @Get()
  @Render('downloads')
  root() {
    return {};
  }
}
