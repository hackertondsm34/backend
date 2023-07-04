import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { GoogleStrategy } from './apis/auth/strategies/google.strategy';
import { UserModule } from './apis/user/user.module';
import { KakaoStrategy } from './apis/auth/strategies/kakao.strategy';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: [GoogleStrategy, KakaoStrategy],
})
export class AppModule {}
