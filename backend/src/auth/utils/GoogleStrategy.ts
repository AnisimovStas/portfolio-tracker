import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'passport-jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID:
        '525898649995-epsvkq17tdatpjdd504bg8iii8a1rml2.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:9229/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    done(null, profile);
  }
}
