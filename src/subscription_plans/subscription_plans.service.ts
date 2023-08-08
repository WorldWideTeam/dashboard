import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubscriptionPlan } from '../../models/subscription_plan.entity';

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectModel(SubscriptionPlan)
    private subscriptionPlanRepository: typeof SubscriptionPlan,
  ) {}

  async findAll(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlanRepository.findAll({
      raw: true,
    });
  }

  findOne({ id }): Promise<SubscriptionPlan> {
    return this.subscriptionPlanRepository.findOne({
      where: {
        id,
      },
    });
  }

  findByPk(id: string): Promise<SubscriptionPlan> {
    return this.subscriptionPlanRepository.findByPk(id, { raw: true });
  }
}
