import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TODO REMOVE',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return {
      id: payload.id,
      email: payload.email,
      displayName: payload.displayName,
      // user: payload.user
    };
  }
}