import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, GoogleAuthGuard, AuthService],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'TODO REMOVE',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
})
export class AuthModule {}
