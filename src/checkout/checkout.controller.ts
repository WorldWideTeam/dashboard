import {
  Get,
  Controller,
  Res,
  UseGuards,
  Param,
  Req,
  Body,
  Post,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UserDecorator, UserDecoratorEntity } from 'src/users/user.decorator';
import { InvoicesService } from '../invoices/invoices.service';
import { SubscriptionPlansService } from 'src/subscription_plans/subscription_plans.service';
import { CoinbaseService } from 'src/coinbase/coinbase.service';
import { InvoiceItemsService } from 'src/invoice_items/invoice_items.service';
import { ChargesService } from 'src/charges/charges.service';
import { UsersService } from 'src/users/users.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ViewAuthFilter } from 'src/auth/view-auth.filter';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

@Controller('/checkout')
export class CheckoutController {
  constructor(
    private invoicesService: InvoicesService,
    private subscriptionPlansService: SubscriptionPlansService,
    private chargesService: ChargesService,
    private invoiceItemsService: InvoiceItemsService,
    private coinbaseService: CoinbaseService,
    private usersService: UsersService,
    @InjectConnection()
    private sequelize: Sequelize,
  ) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async createInvoice(
    @Body('planIn') planIn: string,
    @UserDecorator() user: UserDecoratorEntity,
    @Res() res: Response,
  ) {
    try {
      await this.sequelize.transaction(async (transaction) => {
        const userId = user.id;

        const plan = await this.subscriptionPlansService.findByPk(planIn);

        if (!plan) {
          throw new HttpException('NotFoundError', HttpStatus.NOT_FOUND);
        }

        const invoice = await this.invoicesService.create(
          {
            userId: userId,
            totalAmount: plan.monthPrice * plan.monthCount,
          },
          { transaction },
        );

        await this.invoiceItemsService.create(
          {
            invoiceId: invoice.id,
            price: plan.monthPrice * plan.monthCount,
            subscriptionPlanId: plan.id,
          },
          { transaction },
        );

        res.redirect(`/checkout/${invoice.id}`);
      });
    } catch (error) {
      console.log(error);
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  @Post(':invoiceId/pay')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async createPayment(
    @Param('invoiceId') invoiceId: string,
    @Body('customerEmail') customerEmail: string,
    @UserDecorator() user: UserDecoratorEntity,
    @Res() res: Response,
  ) {
    try {
      await this.sequelize.transaction(async (transaction) => {
        const invoice = await this.invoicesService.findByPk(invoiceId);

        await this.invoicesService.update(
          invoiceId,
          {
            customerEmail: customerEmail,
          },
          { transaction },
        );

        const charge = await this.coinbaseService.createCoinbaseCharge({
          pricing_type: 'fixed_price',
          local_price: {
            amount: String(invoice.totalAmount),
            currency: 'usd',
          },
          name: 'Licence key',
          description: `Payment for ${invoice.code} invoice`,
          metadata: {
            invoice_id: invoice.id,
          },
        });

        await this.chargesService.create({
          code: charge.code,
          invoiceId: invoice.id,
          url: charge.hosted_url,
          amount: invoice.totalAmount,
        });

        res.redirect(`/checkout/${invoice.id}/payment`);
      });
    } catch (error) {
      console.log(error);
      // Transaction has been rolled back
      // err is whatever rejected the promise chain returned to the transaction callback
    }
  }

  @Get(':invoiceId')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async getInvoicePage(
    @Res() res: Response,
    @UserDecorator() user: UserDecoratorEntity,
    @Param('invoiceId') invoiceId: string,
  ) {
    const invoice = await this.invoicesService.findByPk(invoiceId);

    const item = await this.invoiceItemsService.findOne({
      invoiceId: invoice.id,
    });

    const profile = await this.usersService.findOne({ id: user.id });

    res.render('checkout', {
      totalAmount: invoice.totalAmount,
      invoiceItems: [item],
      user: profile,
      invoiceId: invoice.id,
    });
  }

  @Get(':invoiceId/payment')
  @UseGuards(AuthenticatedGuard)
  @UseFilters(ViewAuthFilter)
  async getPaymentPage(
    @Res() res: Response,
    @UserDecorator() user: UserDecoratorEntity,
    @Param('invoiceId') invoiceId: string,
  ) {
    const invoice = await this.invoicesService.findByPk(invoiceId);

    const item = await this.invoiceItemsService.findOne({
      invoiceId: invoice.id,
    });

    const payment = await this.chargesService.findOne({
      invoiceId: invoice.id,
    });

    const profile = await this.usersService.findOne({ id: user.id });

    res.render('checkout_payment', {
      totalAmount: invoice.totalAmount,
      checkoutUrl: payment.url,
      invoiceItems: [item],
      user: profile,

      invoiceCode: invoice.code,
    });
  }
}
