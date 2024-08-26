import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';
import { OAuthDto } from '../dto/oauth.dto';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/naver/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<OAuthDto> {
    const { email, nickname, profile_image, id: profile_id } = profile._json;

    console.log(accessToken);
    console.log(refreshToken);

    return {
      provider: 'naver',
      id: profile_id,
      email: email,
      nickname: nickname,
      photo: profile_image,
    };
  }
}
