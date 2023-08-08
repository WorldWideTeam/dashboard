import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models/user.entity';
import { UsersService } from 'src/users/users.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],

  exports: [UsersService],
  controllers: [ProfileController],
})
export class ProfileModule {}
