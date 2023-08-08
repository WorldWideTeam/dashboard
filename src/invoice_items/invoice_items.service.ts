import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { InvoiceItem } from 'models/invoice-item.entity';
import { SubscriptionPlan } from 'models/subscription_plan.entity';

type CreateBillingItemDto = {
  subscriptionPlanId: string;
  invoiceId: string;
  price: number;
};

type FindOneInvoiceDTO = {
  invoiceId: string;
};

type TOptions = {
  transaction: Transaction;
};

@Injectable()
export class InvoiceItemsService {
  constructor(
    @InjectModel(InvoiceItem)
    private invoiceItemsRepository: typeof InvoiceItem,
  ) {}

  async findAll(): Promise<InvoiceItem[]> {
    return this.invoiceItemsRepository.findAll({
      raw: true,
    });
  }

  findOne(params: FindOneInvoiceDTO): Promise<InvoiceItem> {
    return this.invoiceItemsRepository.findOne({
      where: params,
      include: [{ model: SubscriptionPlan }],
    });
  }

  findByPk(id: string): Promise<InvoiceItem> {
    return this.invoiceItemsRepository.findByPk(id, { raw: true });
  }

  async create(params: CreateBillingItemDto, options?: TOptions | undefined) {
    return this.invoiceItemsRepository.create(params, options);
  }
}
