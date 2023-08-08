import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { Invoice } from 'models/invoice.entity';

@Module({
  imports: [SequelizeModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
