import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtUtilModule } from 'src/util/jwt/jwt-util.module';
import { JwtAuthGuard } from 'src/util/jwt/jwt-guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtUtilModule],
  providers: [UserService, JwtAuthGuard],
  controllers: [UserController],
})
export class UserModule {}
