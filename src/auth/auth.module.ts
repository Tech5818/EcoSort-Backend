import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { NaverStrategy } from './strategy/naver.strategy';

@Module({
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
