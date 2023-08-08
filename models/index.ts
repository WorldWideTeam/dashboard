import { User } from 'models/user.entity';
import { Invoice } from 'models/invoice.entity';
import { Charge } from 'models/charge.entity';
import { LicenceKey } from 'models/licence_key.entity';
import { InvoiceItem } from 'models/invoice-item.entity';
import { Subscription } from 'models/subscription.entity';
import { SubscriptionPlan } from 'models/subscription_plan.entity';

export const models = [
  User,
  Invoice,
  Charge,
  LicenceKey,
  InvoiceItem,
  Subscription,
  SubscriptionPlan,
];
