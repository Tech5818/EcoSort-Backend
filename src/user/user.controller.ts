import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/util/jwt/jwt-guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return this.userService.findById(userId);
  }
}
