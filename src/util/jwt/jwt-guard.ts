// auth/jwt-auth.guard.ts
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtUtil } from 'src/util/jwt/jwt-util';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtUtil: JwtUtil) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const verified = this.jwtUtil.verify(token);
      request.user = verified; // 토큰 검증 후 유저 정보 저장
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
