import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LicenceKey } from '../../models/licence_key.entity';
import { Subscription } from '../../models/subscription.entity';

const LicenceKeyLength = 32;
const LicenceKeyPairs = 4;
const CharactersString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface ICreateLicenceKeyDTO {
  subscriptionId: string;
  key?: string;
  deviceId?: string;
  userId?: string;
}

@Injectable()
export class LicenceKeysService {
  constructor(
    @InjectModel(LicenceKey)
    private licenceKeysRepository: typeof LicenceKey,
  ) {}

  async findAll({ userId }): Promise<LicenceKey[]> {
    return this.licenceKeysRepository.findAll({
      where: { userId },
      include: [Subscription],
    });
  }

  create(params: ICreateLicenceKeyDTO, options) {
    params.key = this.generateLicenseKey();
    return this.licenceKeysRepository.create(params, options);
  }

  findOne(id: string): Promise<LicenceKey> {
    return this.licenceKeysRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  private generateLicenseKey() {
    let result = '';
    const charactersLength = CharactersString.length;
    for (let i = 0; i < LicenceKeyLength; i++) {
      result += CharactersString.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    return result.match(new RegExp(`.{1,${LicenceKeyPairs}}`, 'g')).join('-');
  }
}
