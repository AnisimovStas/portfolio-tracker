import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserGoogleDetailsDto } from './dto/user-google-details.dto';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async loginOrRegister(
    userDto: UserGoogleDetailsDto,
  ): Promise<{ access_token: string }> {
    const email = userDto.emails[0].value;
    await this.usersRepository.findOrCreateUser(userDto);

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { access_token: accessToken };
  }
}
