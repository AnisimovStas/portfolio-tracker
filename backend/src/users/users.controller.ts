// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  // constructor(private readonly usersService: UsersService) {}
  //
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(id: string) {
  //   return this.usersService.findOne(id);
  // }
  //
  // @Post()
  // create(@Body() userDto: CreateUserDto) {
  //   return this.usersService.create(userDto);
  // }
  //
  // @Post(':id')
  // update(@Body() userDto: UpdateUserDto, @Param('id') id: string) {
  //   return this.usersService.update(id, userDto);
  // }
}
