import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/:social')
  @UseGuards(DynamicAuthGuard)
  loginOAuth(@Req() req: Request, @Res() res: Response) {
    return this.authService.
  }
}
