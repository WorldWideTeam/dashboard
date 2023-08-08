import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';

import { SubscriptionPlan } from './subscription_plan.entity';
import { Invoice } from './invoice.entity';

@Table({ tableName: 'invoice_items', underscored: true })
export class InvoiceItem extends Model<InvoiceItem> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'invoices',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  invoiceId: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'subscription_plans',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  subscriptionPlanId: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    defaultValue: 0,
  })
  price: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;

  @BelongsTo(() => SubscriptionPlan, 'subscriptionPlanId')
  subscriptionPlan: SubscriptionPlan;

  @BelongsTo(() => Invoice, 'invoiceId')
  invoice: Invoice;
}
