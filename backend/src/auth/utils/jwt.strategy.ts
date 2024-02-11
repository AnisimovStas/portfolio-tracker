import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../users.repository';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TODO REMOVE',
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user: User = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
