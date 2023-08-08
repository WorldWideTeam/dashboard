import {
  Column,
  Model,
  Table,
  PrimaryKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Subscription } from './subscription.entity';

@Table({ tableName: 'licence_keys', underscored: true })
export class LicenceKey extends Model<LicenceKey> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  key: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'devices',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  deviceId: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'subscriptions',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  subscriptionId: string;

  @Column({
    type: DataType.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  userId: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => Subscription, 'subscriptionId')
  subscription: Subscription;
}
