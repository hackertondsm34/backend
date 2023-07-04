import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

     constructor(
          private authService: AuthService
     ) {}

     @UseGuards(AuthGuard('google'))
     @Get('google')
     async googleAuth() {

     }

     @Get('google/redirect')
     @UseGuards(AuthGuard('google'))
     async googleAuthRedirect(@Req() req: any): Promise<void> {
       this.authService.
     }

}