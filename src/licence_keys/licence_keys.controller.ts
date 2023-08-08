import {
  Get,
  Controller,
  Res,
  UseGuards,
  Render,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { LicenceKeysService } from './licence_keys.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ViewAuthFilter } from 'src/auth/view-auth.filter';
import { UserDecorator, UserDecoratorEntity } from 'src/users/user.decorator';
@Controller()
export class LicenceKeysController {
  constructor(private licenceKeysService: LicenceKeysService) {}

  @Get('account/licence_keys')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async getUserLicenceKeysPage(
    @Res() res: Response,
    @UserDecorator() user: UserDecoratorEntity,
  ) {
    const licenceKeys = await this.licenceKeysService.findAll({
      userId: user.id,
    });

    return res.render('licence_keys', { licenceKeys: licenceKeys });
  }
}
