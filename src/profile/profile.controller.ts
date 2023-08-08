import { Response } from 'express';
import { Get, Controller, Res, UseGuards, UseFilters } from '@nestjs/common';
import { UserDecorator, UserDecoratorEntity } from 'src/users/user.decorator';

import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ViewAuthFilter } from 'src/auth/view-auth.filter';

@Controller('/profile')
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async root(
    @UserDecorator() sessionUser: UserDecoratorEntity,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findByPK(sessionUser.id);

    res.render('profile', { email: user.email, username: user.username });
  }
}
