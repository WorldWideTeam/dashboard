import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SubscriptionPlansModule } from '../subscription_plans/subscription_plans.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { InvoiceItemsModule } from '../invoice_items/invoice_items.module';
import { LicenceKeysModule } from '../licence_keys/licence_keys.module';
import { ChargesModule } from '../charges/charges.module';
import { InvoicesModule } from '../invoices/invoices.module';

import { CoinbaseController } from './coinbase.controller';
import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [
    HttpModule,
    ChargesModule,
    InvoicesModule,
    LicenceKeysModule,
    InvoiceItemsModule,
    SubscriptionsModule,
    SubscriptionPlansModule,
  ],
  controllers: [CoinbaseController],
  providers: [CoinbaseService], 
  exports: [CoinbaseService],
})
export class CoinbaseModule {}
