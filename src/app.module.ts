import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { GoogleStrategy } from './apis/auth/strategies/google.strategy';
import { UserModule } from './apis/user/user.module';
import { KakaoStrategy } from './apis/auth/strategies/kakao.strategy';
import { NaverStrategy } from './apis/auth/strategies/naver.strategy';
import { QuizModule } from './apis/quiz/quiz.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, QuizModule],
  controllers: [],
  providers: [GoogleStrategy, KakaoStrategy, NaverStrategy],
})
export class AppModule {}
