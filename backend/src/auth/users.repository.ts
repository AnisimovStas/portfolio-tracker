import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserGoogleDetailsDto } from './dto/user-google-details.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOrCreateUser(userDto: UserGoogleDetailsDto): Promise<User> {
    const { displayName } = userDto;
    const email = userDto.emails[0].value;

    //TODO add email hashing

    try {
      const user: User = await this.findOneOrFail({ where: { email: email } });
      return user;
    } catch (error) {
      const newUser: User = this.create({ displayName, email });

      try {
        await this.save(newUser);
        return newUser;
      } catch (error) {
        if (error.code === '23505') {
          throw new ConflictException('User already exists');
        } else {
          throw new InternalServerErrorException(error);
        }
      }
    }
  }
}
