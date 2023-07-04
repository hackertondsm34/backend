import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './apis/auth/auth.module';
import { GoogleStrategy } from './apis/auth/strategies/google.strategy';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
