import { Controller } from '@nestjs/common';
import { Body, Post, Query } from '@nestjs/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/all')
  findAll() {
    return this.userService.findAll();
  }

  @Post('/one')
  findOne(@Query('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('/create')
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Post('/update')
  update(@Body() body: any) {
    return this.userService.update(body);
  }

  @Post('/delete')
  delete(@Body('id') id: number) {
    return this.userService.delete(id);
  }
}
