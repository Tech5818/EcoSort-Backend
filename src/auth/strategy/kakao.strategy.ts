import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { OAuthDto } from '../dto/oauth.dto';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/kakao/callback',
      scope: ['profile_nickname', 'profile_image', 'account_email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<OAuthDto> {
    const { id: profile_id, kakao_account, properties } = profile._json;

    return {
      provider: 'kakao',
      id: profile_id,
      email: kakao_account.email,
      nickname: properties.nickname,
      photo: properties.thumbnail_image,
    };
  }
}
