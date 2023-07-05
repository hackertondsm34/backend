import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IAuthUser } from "src/common/interfaces/context";
import { UserService } from "./user.service";
import { MyPageResponse } from "./user.dto";

@Controller('users')
export class UsersController {
     constructor(
          @Inject(REQUEST)
          private request: IAuthUser,

          private userService: UserService
     ) {}

     @UseGuards(AuthGuard('jwt'))
     @Get('/my')
     async myPage(): Promise<MyPageResponse> {
          return this.userService.myPage(this.request.user.user_id);
     }
}