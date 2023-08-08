import {
  Get,
  Controller,
  Res,
  UseGuards,
  Param,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { SubscriptionPlansService } from './subscription_plans.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ViewAuthFilter } from 'src/auth/view-auth.filter';

@Controller('/plans')
export class SubscriptionPlansController {
  constructor(private subscriptionPlansService: SubscriptionPlansService) {}

  @Get()
  async root(@Res() res: Response) {
    const subscriptionPlans = await this.subscriptionPlansService.findAll();

    res.render('subscription_plans', {
      subscriptionPlans,
    });
  }

  @Get(':id/buy')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async getBillingPage(@Res() res: Response, @Param('id') productId: string) {
    const product = await this.subscriptionPlansService.findByPk(productId);
    res.render('billing', { product, layout: 'main' });
  }
}
