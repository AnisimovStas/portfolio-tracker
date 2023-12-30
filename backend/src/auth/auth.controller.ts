import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  public jwtToken = { access_token: '' };
  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  handleLogin() {
    return { message: `Hello World!` };
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async handleRedirect(@Req() request: Request, @Res() response: Response) {
    const jwt = await this.authService.login(request.user);

    this.jwtToken = jwt;

    response.cookie('authorization', jwt.access_token);
    return response.redirect('http://localhost:3000/profile');
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getMe')
  getMe(@Req() request: Request) {
    return request.user;
  }

  @Delete('logout')
  async logout() {
    const jwt = await this.authService.login('');

    this.jwtToken = jwt;

    return { msg: 'Logged out' };
  }
}
