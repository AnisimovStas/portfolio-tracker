import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { GoogleAuthGuard } from './utils/Guards';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    JwtStrategy,
    GoogleAuthGuard,
    AuthService,
    UsersRepository,
  ],
  exports: [AuthService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'TODO REMOVE',
      signOptions: {
        expiresIn: '6000s',
      },
    }),
  ],
})
export class AuthModule {}
