import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

const SALT_ROUND = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ username });

    if (user) {
      const isTheSame = await this.comparePasswords(
        user.hashedPassword,
        password,
      );

      if (isTheSame) {
        delete user.hashedPassword;
        return user;
      }
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);

    if (user) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
        }),
      };
    } else {
      return null;
    }
  }

  generateHash(password: string) {
    return bcrypt.hash(password, SALT_ROUND);
  }

  comparePasswords(hash: string, password: string) {
    return bcrypt.compare(password, hash);
  }
}
