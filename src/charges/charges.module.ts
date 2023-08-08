import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChargesController } from './charges.controller';
import { ChargesService } from './charges.service';
import { Charge } from 'models/charge.entity';

@Module({
  imports: [SequelizeModule.forFeature([Charge])],
  controllers: [ChargesController],
  providers: [ChargesService],
  exports: [ChargesService],
})
export class ChargesModule {}
