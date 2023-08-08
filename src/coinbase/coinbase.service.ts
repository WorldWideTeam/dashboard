import { Webhook } from 'coinbase-commerce-node';
import { Injectable } from '@nestjs/common';
import { CoinbaseConfigs } from './config';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { InvoicesService } from '../invoices/invoices.service';
import { ChargesService } from '../charges/charges.service';
import { SubscriptionPlansService } from '../subscription_plans/subscription_plans.service';
import { LicenceKeysService } from '../licence_keys/licence_keys.service';
import { InvoiceItemsService } from '../invoice_items/invoice_items.service';
import { ChargeStatus } from '../charges/charge_status.enum';
import { HttpService } from '@nestjs/axios';
import { SubscriptionStatus } from '../subscriptions/subscription_status.enum';
import { ICoinbaseCharge, CreateChargeDTO } from './coinbase.dto';
import { CoinbaseSettings } from './coinbase.constant';
import { Sequelize } from 'sequelize';
import { InjectConnection } from '@nestjs/sequelize';
@Injectable()
export class CoinbaseService {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly chargesService: ChargesService,
    private readonly invoiceItemsService: InvoiceItemsService,
    private readonly subscriptionPlansService: SubscriptionPlansService,
    private readonly licenceKeysService: LicenceKeysService,
    private readonly httpService: HttpService,
    @InjectConnection()
    private sequelize: Sequelize,
  ) {}
  verifyEventBody({ rawBody, headers }) {
    return Webhook.verifyEventBody(
      rawBody,
      headers['x-cc-webhook-signature'],
      CoinbaseConfigs.WebhookApiKey,
    );
  }

  async confirmCharge(event) {
    await this.sequelize.transaction(async (transaction) => {
      const invoice = await this.invoicesService.findOne({
        id: event.data.metadata['invoice_id'],
      });

      const invoice_item = await this.invoiceItemsService.findOne({
        invoiceId: invoice.id,
      });

      const subscription = await this.subscriptionsService.create(
        {
          userId: invoice.userId,
          planId: invoice_item.subscriptionPlanId,
          status: SubscriptionStatus.Active,
        },
        { transaction },
      );

      await this.licenceKeysService.create(
        {
          subscriptionId: subscription.id,
          userId: invoice.userId,
        },
        { transaction },
      );

      await this.chargesService.update(
        event.data.id,
        {
          status: ChargeStatus.Confirmed,
        },
        { transaction },
      );
    });
  }

  async createCoinbaseCharge(
    params: CreateChargeDTO,
  ): Promise<ICoinbaseCharge> {
    const response = await this.httpService.axiosRef.post(
      'https://api.commerce.coinbase.com/charges/',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Api-Key': CoinbaseSettings.ApiKey,
          'X-CC-Version': CoinbaseSettings.Version,
        },
      },
    );

    return response.data.data;
  }

  async createCharge(event) {
    console.log(event);
    await this.chargesService.create({
      id: event.data.id,
      url: event.data.hosted_url,
      code: event.data.code,
      currency: 'USD',
      status: ChargeStatus.Created,
      invoiceId: event.data.metadata['invoice_id'],
      amount: parseFloat(event.data.pricing.local.amount),
    });
  }
}
