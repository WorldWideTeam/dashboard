import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Config from '../config';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

import { models } from 'models';
import { modules } from 'src/modules';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: 5432,
      host: Config.Database.Host,
      database: Config.Database.Name,
      username: Config.Database.Username,
      password: Config.Database.Password,
      models: models,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
