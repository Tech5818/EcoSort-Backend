import { Injectable } from '@nestjs/common';
import { OAuthDto } from './dto/oauth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtUtil } from 'src/util/jwt/jwt-util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtUtil: JwtUtil,
  ) {}
  async getJwt(user: OAuthDto) {}
  async loginUser(data: OAuthDto) {
    let user = await this.userRepository.findOne({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      const token = this.jwtUtil.sign({
        email: data.email,
        nickname: data.nickname,
        photo: data.photo,
      });

      console.log(token);

      user = user = this.userRepository.create({
        id: data.id,
        token,
        provider: data.provider,
      });

      await this.userRepository.save(user);
    }
    return user;
  }
}
