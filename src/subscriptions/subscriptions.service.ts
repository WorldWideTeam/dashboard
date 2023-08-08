import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from 'models/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription)
    private subscriptionsRepository: typeof Subscription,
  ) {}

  async create(
    params: CreateSubscriptionDto,
    options,
  ): Promise<Subscription | undefined> {
    return this.subscriptionsRepository.create(params, {
      transaction: options.transaction,
    });
  }

  findAll() {
    return this.subscriptionsRepository.findAll();
  }

  findOne({ id }) {
    return this.subscriptionsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, params: UpdateSubscriptionDto, options = {}) {
    return this.subscriptionsRepository.update(params, {
      where: {
        id,
      },
      ...options,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
