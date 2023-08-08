import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { InvoiceItemsService } from './invoice_items.service';
import { InvoiceItem } from 'models/invoice-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([InvoiceItem])],
  providers: [InvoiceItemsService],
  exports: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
