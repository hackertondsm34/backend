import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtProvider {
  generateToken(email: string): string {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: 60 * 60 * 3,
    });
  }
}
