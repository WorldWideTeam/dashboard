import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';

import { Subscription } from 'models/subscription.entity';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  imports: [SequelizeModule.forFeature([Subscription])],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
