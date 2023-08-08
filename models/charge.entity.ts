import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'charges', underscored: true })
export class Charge extends Model<Charge> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    defaultValue: 0,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  })
  url: string;

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
    type: DataType.ENUM(
      'CREATED',
      'CONFIRMED',
      'PENDING',
      'APPROVED',
      'FAILED',
      'RESOLVED',
      'CANCELED',
      'DECLINED',
    ),
    defaultValue: 'CREATED',
  })
  status: string;

  @Column({
    type: DataType.ENUM('USD'),
    defaultValue: 'USD',
  })
  currency: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  note: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
