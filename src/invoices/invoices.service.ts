import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from '../../models/invoice.entity';
import * as shortUUID from 'short-uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice)
    private invoicesRepository: typeof Invoice,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return this.invoicesRepository.findAll({
      raw: true,
    });
  }

  async create(params, options): Promise<Invoice | undefined> {
    const uuid = uuidv4();
    const short = shortUUID().fromUUID(uuid);
    return this.invoicesRepository.create(
      {
        id: uuid,
        code: short,
        ...params,
      },
      {
        transaction: options.transaction,
      },
    );
  }

  findOne({ id }: { id: string }): Promise<Invoice> {
    return this.invoicesRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, params: any, options) {
    return this.invoicesRepository.update(params, {
      where: {
        id,
      },
      transaction: options?.transaction,
    });
  }

  findByPk(id: string): Promise<Invoice> {
    return this.invoicesRepository.findByPk(id, { raw: true });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne({ id });
    await user.destroy();
  }
}
