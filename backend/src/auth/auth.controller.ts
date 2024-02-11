import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserGoogleDetailsDto } from './dto/user-google-details.dto';
import { GetUser } from './utils/get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  handleLogin() {
    return { message: `Hello World!` };
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/redirect')
  async handleRedirect(@Req() request: Request, @Res() response: Response) {
    const user = request.user as UserGoogleDetailsDto;
    const jwt = await this.authService.loginOrRegister(user);

    response.cookie('authorization', jwt.access_token);
    return response.redirect('http://localhost:3000/profile');
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('status')
  user() {
    return { msg: 'Authenticated' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getMe')
  getMe(@GetUser() user: User) {
    return user;
  }
}
