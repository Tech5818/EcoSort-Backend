import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtUtil } from './jwt-util';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dsfafds',
    }),
  ],
  providers: [JwtUtil],
  exports: [JwtUtil],
})
export class JwtUtilModule {}
