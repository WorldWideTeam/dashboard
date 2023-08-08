import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Charge } from '../../models/charge.entity';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDTO } from './dto/update-payment.dto';

const formatWhereParams = (params) => JSON.parse(JSON.stringify(params));

@Injectable()
export class ChargesService {
  constructor(
    @InjectModel(Charge)
    private chargesRepository: typeof Charge,
  ) {}

  async findAll(): Promise<Charge[]> {
    return this.chargesRepository.findAll({
      raw: true,
    });
  }

  findOne(params): Promise<Charge> {
    return this.chargesRepository.findOne({
      where: params,
      order: [['createdAt', 'DESC']],
    });
  }

  findByPk(id: string): Promise<Charge> {
    return this.chargesRepository.findByPk(id, { raw: true });
  }

  update(id: string, params: UpdatePaymentDTO, options = {}) {
    return this.chargesRepository.update(params, {
      where: {
        id,
      },
      ...options,
    });
  }

  async create(params: CreatePaymentDto) {
    return this.chargesRepository.create(params);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
