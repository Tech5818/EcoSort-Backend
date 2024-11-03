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

  async loginUser(data: OAuthDto) {
    let user = await this.userRepository.findOne({
      where: { id: data.id },
    });

    if (!user) {
      await this.userRepository.insert(data);

      user = await this.userRepository.findOne({ where: { id: data.id } });
    }

    const payload = {
      id: user.id,
      provider: user.provider,
      email: user.email,
      nickname: user.nickname,
      photo: user.photo,
    };

    const token = this.jwtUtil.sign(payload);

    return token;
  }
}
