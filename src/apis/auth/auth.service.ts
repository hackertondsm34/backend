import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { JwtProvider } from 'src/apis/auth/provider/jwt.provider';
import { randomInt } from 'crypto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: JwtProvider,
  ) {}

  private randomUserNames = new Array<string>(
    '배고픈화산',
    '멋쟁이안전이',
    '행복한시민',
    '외로운대마인',
  );

  async login(req: any, res: Response) {
    const { email } = req.user;
    console.log(email);
    const user = await this.userRepository.findUserByEmail(email);
    if (user == null) {
      await this.createUser(email);
    }

    const token =
      process.env.JWT_PREFIX +
      ' ' +
      (await this.tokenProvider.generateToken(email));

    res.json({ token });
  }

  private async createUser(email: string) {
    const randomUserName =
      this.randomUserNames[randomInt(3)] + '@' + randomInt(5000);
    await this.userRepository.saveUser({
      name: randomUserName,
      email: email,
      total_score: 0,
    });
  }
}
