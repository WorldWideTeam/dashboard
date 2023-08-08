import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';

import { SubscriptionPlan } from 'models/subscription_plan.entity';
import { User } from 'models/user.entity';

@Table({ tableName: 'subscriptions', underscored: true })
export class Subscription extends Model<Subscription> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'SET NULL',
  })
  userId: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'subscription_plans',
      key: 'id',
    },
    onDelete: 'SET NULL',
  })
  planId: string;

  @Column({
    type: DataType.ENUM('ACTIVE', 'DISABLED'),
    defaultValue: 'DISABLED',
  })
  status: string;

  @Column
  createdAt: Date;

  @Column
  expiredAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;

  @BelongsTo(() => SubscriptionPlan, 'planId')
  plan: SubscriptionPlan;

  @BelongsTo(() => User, 'userId')
  user: User;
}
