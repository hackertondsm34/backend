import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { GoogleStrategy } from './apis/auth/strategies/google.strategy';
import { UserModule } from './apis/user/user.module';
import { KakaoStrategy } from './apis/auth/strategies/kakao.strategy';
import { NaverStrategy } from './apis/auth/strategies/naver.strategy';
import { QuestionModule } from './apis/question/question.module';
import { QuizModule } from './apis/quiz/quiz.module';
import { JwtAccessStrategy } from './apis/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    QuizModule,
    QuestionModule
  ],
  controllers: [],
  providers: [GoogleStrategy, KakaoStrategy, NaverStrategy, JwtAccessStrategy],
})
export class AppModule {}
