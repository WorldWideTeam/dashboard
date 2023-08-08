import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private users: typeof User) {}

  async findOne(params: {
    username?: string;
    id?: string;
  }): Promise<User | undefined> {
    return this.users.findOne({
      where: JSON.parse(JSON.stringify(params)),
    });
  }

  async findByPK(userId: string): Promise<User | undefined> {
    return this.users.findByPk(userId);
  }

  async create(params): Promise<User | undefined> {
    return this.users.create(params);
  }
}
