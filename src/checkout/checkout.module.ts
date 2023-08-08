import { Module } from '@nestjs/common';

import { SubscriptionPlansModule } from '../subscription_plans/subscription_plans.module';
import { InvoiceItemsModule } from '../invoice_items/invoice_items.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { CoinbaseModule } from '../coinbase/coinbase.module';
import { ChargesModule } from '../charges/charges.module';
import { CheckoutController } from './checkout.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    InvoicesModule,
    CoinbaseModule,
    ChargesModule,
    InvoiceItemsModule,
    SubscriptionPlansModule,
  ],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
