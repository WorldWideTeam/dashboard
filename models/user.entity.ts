import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'users', underscored: true })
export class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  role: string;

  @Column
  hashedPassword: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @Column
  deletedAt: Date;
}

export interface IUser {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  hashedPassword?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
