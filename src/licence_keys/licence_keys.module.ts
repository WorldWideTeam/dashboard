import { Module } from '@nestjs/common';
import { LicenceKeysController } from './licence_keys.controller';
import { LicenceKeysService } from './licence_keys.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { LicenceKey } from '../../models/licence_key.entity';

@Module({
  imports: [SequelizeModule.forFeature([LicenceKey])],
  controllers: [LicenceKeysController],
  providers: [LicenceKeysService],
  exports: [LicenceKeysService],
})
export class LicenceKeysModule {}
