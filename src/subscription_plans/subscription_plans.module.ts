import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { SubscriptionPlansController } from './subscription_plans.controller';
import { SubscriptionPlansService } from './subscription_plans.service';
import { SubscriptionPlan } from 'models/subscription_plan.entity';

@Module({
  imports: [SequelizeModule.forFeature([SubscriptionPlan])],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
