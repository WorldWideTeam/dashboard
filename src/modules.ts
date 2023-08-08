import { SubscriptionPlansModule } from 'src/subscription_plans/subscription_plans.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { InvoiceItemsModule } from 'src/invoice_items/invoice_items.module';
import { LicenceKeysModule } from 'src/licence_keys/licence_keys.module';
import { DownloadsModule } from 'src/downloads/downloads.module';
import { ChargesModule } from 'src/charges/charges.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { CheckoutModule } from 'src/checkout/checkout.module';
import { CoinbaseModule } from 'src/coinbase/coinbase.module';
import { ProfileModule } from 'src/profile/profile.module';
import { AuthModule } from 'src/auth/auth.module';

export const modules = [
  SubscriptionPlansModule,
  SubscriptionsModule,
  InvoiceItemsModule,
  LicenceKeysModule,
  DownloadsModule,
  CheckoutModule,
  InvoicesModule,
  CoinbaseModule,
  ChargesModule,
  ProfileModule,
  AuthModule,
];
