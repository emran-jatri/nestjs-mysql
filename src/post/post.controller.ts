import { Controller } from '@nestjs/common';
import { Body, Post, Query } from '@nestjs/common/decorators';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/all')
  findAll() {
    return this.postService.findAll();
  }

  @Post('/one')
  findOne(@Query('id') id: number) {
    return this.postService.findOne(id);
  }

  @Post('/create')
  async create(@Body() body: any) {
    const post = await this.postService.create(body);
    return post;
  }

  @Post('/update')
  update(@Body() body: any) {
    return this.postService.update(body);
  }

  @Post('/delete')
  delete(@Body('id') id: number) {
    return this.postService.delete(id);
  }
}
