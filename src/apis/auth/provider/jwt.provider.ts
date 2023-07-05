import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  constructor(private jwtService: JwtService) {}

  async generateToken(email: string): Promise<string> {
    return this.jwtService.signAsync(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: 60 * 60 * 3,
      },
    );
  }
}
