import {
  Get,
  Controller,
  Res,
  Req,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('auth/signin')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  }

  @Post('auth/signup')
  async registration(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Res() res,
  ) {
    const hashedPassword = await this.authService.generateHash(password);

    const user = await this.usersService.create({
      username,
      email,
      hashedPassword,
    });

    if (user) {
      res.redirect('/');
    } else {
      res.redirect('/error');
    }
  }

  @Get('auth/logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    req.session.destroy((err) => {
      return res.redirect('/');
    });
  }

  @Get('login')
  getSigninPage(@Res() res: Response) {
    return res.render('signin', { layout: 'authorization_layout' });
  }

  @Get('registration')
  getSignupPage(@Res() res: Response) {
    return res.render('signup', { layout: 'authorization_layout' });
  }
}
