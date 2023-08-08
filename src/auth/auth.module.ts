import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      secretOrPrivateKey: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {}
