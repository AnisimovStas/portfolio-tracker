import { Injectable } from '@nestjs/common';
import { UserDetailsDto } from './dto/UserDetails.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async login(user: any) {
    if (user) {
      const userInDB = await this.usersRepository.findOneBy({
        email: user.emails[0].value,
      });

      const details: UserDetailsDto = {
        email: user.emails[0].value,
        displayName: user.displayName,
      };

      const tokenPayload = {
        id: user.id,
        email: user.emails[0].value,
        displayName: user.displayName,
      };
      if (userInDB) {
        const updatedUser = this.usersRepository.merge(userInDB, details);
        await this.usersRepository.save(updatedUser);
        tokenPayload.id = userInDB.id;
      }
      if (!userInDB) {
        const newUser = this.usersRepository.create(details);
        await this.usersRepository.save(newUser);
        tokenPayload.id = newUser.id;
      }

      return {
        access_token: this.jwtService.sign(tokenPayload),
      };
    } else {
      return { access_token: null };
    }
  }
}
