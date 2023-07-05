import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { GoogleStrategy } from './apis/auth/strategies/google.strategy';
import { UserModule } from './apis/user/user.module';
import { KakaoStrategy } from './apis/auth/strategies/kakao.strategy';
import { NaverStrategy } from './apis/auth/strategies/naver.strategy';
import { QuestionModule } from './apis/question/question.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, QuestionModule],
  controllers: [],
  providers: [GoogleStrategy, KakaoStrategy, NaverStrategy],
})
export class AppModule {}
