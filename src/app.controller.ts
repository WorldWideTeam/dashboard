import {
  Get,
  Controller,
  Redirect,
  Render,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ViewAuthFilter } from 'src/auth/view-auth.filter';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private userService: UsersService,
  ) {}

  @Get('/')
  @Render('about_us')
  getAboutUsPage() {
    return {};
  }

  @Get('/contacts')
  @Render('contacts')
  getContactsPage() {
    return {};
  }

  @Get('/docs')
  @Render('docs')
  getDocsPage() {
    return { layout: 'documentation' };
  }
}
