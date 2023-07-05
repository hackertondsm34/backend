import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':social')
  @UseGuards(DynamicAuthGuard)
  async loginOAuth(@Req() req: any, @Res() res: Response) {}

  @Get(':social/redirect')
  @UseGuards(DynamicAuthGuard)
  async redirectOAuth(@Req() req: any, @Res() res: Response) {
    this.authService.login(req, res);
  }
}
