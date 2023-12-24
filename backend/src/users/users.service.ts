// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
//
// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//   ) {}
//
//   findAll() {
//     return this.usersRepository.find();
//   }
//
//   findOne(id: string) {
//     return this.usersRepository.findOneBy({ id });
//   }
//
//   create(userDto: CreateUserDto) {
//     const newUser = this.usersRepository.create(userDto);
//     return this.usersRepository.save(newUser);
//   }
//
//   async update(id: string, userDto: UpdateUserDto) {
//     const user = this.usersRepository.findOneBy({ id });
//
//     if (!user) {
//       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//     }
//
//     const updatedUser = { ...user, ...userDto };
//
//     await this.usersRepository.update(id, updatedUser);
//
//     return updatedUser;
//   }
// }
