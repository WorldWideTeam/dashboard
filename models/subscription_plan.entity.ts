import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'subscription_plans', underscored: true })
export class SubscriptionPlan extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  monthPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  monthCount: number;

  @Column
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
