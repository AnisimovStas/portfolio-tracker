import { Injectable } from '@nestjs/common';
import { UserDetailsDto } from './dto/UserDetails.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async validateUser(details: UserDetailsDto) {
    const user = await this.usersRepository.findOneBy({ email: details.email });

    if (user) {
      const updatedUser = this.usersRepository.merge(user, details);
      return this.usersRepository.save(updatedUser);
    }

    if (!user) {
      const newUser = this.usersRepository.create(details);
      return this.usersRepository.save(newUser);
    }
  }

  async findUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }
}
