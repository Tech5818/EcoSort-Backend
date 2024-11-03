import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtUtilModule } from 'src/util/jwt/jwt-util.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtUtilModule],
  providers: [AuthService, GoogleStrategy, KakaoStrategy, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
