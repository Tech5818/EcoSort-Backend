import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtUtil } from 'src/util/jwt/jwt-util';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,

    private readonly jwtUtil: JwtUtil,
  ) {}
  async validateUser(token: string) {
    return this.jwtUtil.verify(token);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }

  async updateById() {}

  async deleteById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    await this.userRepository.remove(user);

    return user;
  }
}
