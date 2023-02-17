import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public validatePass(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ username }, true);
    if (user && this.validatePass(pass, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
