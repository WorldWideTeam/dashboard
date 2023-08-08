import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'invoices', underscored: true })
export class Invoice extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  customerEmail: string;

  @Column({
    type: DataType.STRING,
    defaultValue: DataType.STRING(32),
    unique: true,
  })
  code: string;

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

  @Column({
    type: DataType.ENUM(
      'CREATED',
      'COMPLITED',
      'FAILED',
      'CANCELED',
      'DECLINED',
    ),
    defaultValue: 'CREATED',
  })
  status: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    defaultValue: 0,
  })
  totalAmount: number;

  @Column
  createdAt: Date;

  @Column
  fullyPaidDate: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
