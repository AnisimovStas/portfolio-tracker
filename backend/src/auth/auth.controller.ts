import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request, Response } from 'express';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('auth')
export class AuthController {
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin() {
    return { message: 'Hello World!' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    response.cookie('isAuth', true);
    return response.redirect('http://localhost:3000');
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }

  @Get('getMe')
  getMe(@Req() request: Request) {
    if (request.user) {
      return request.user;
    } else {
      throw new HttpException(
        {
          msg: ' You are not Authenticated',
          status: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  @Delete('logout')
  logout(@Req() request: Request) {
    if (!request.user) {
      throw new HttpException(
        {
          msg: 'You are was not Authenticated',
          status: HttpStatus.NOT_ACCEPTABLE,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    request.logout({}, () => {
      msg: 'Logged out';
    });

    return { msg: 'Logged out' };
  }
}
