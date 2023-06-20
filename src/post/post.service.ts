import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  Repository,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  findAll(): Promise<Post[]> | any {
    const paginateOptions: FindManyOptions<Post> = {
      select: {
        id: true,
        content: true,
        createdBy: {
          id: true,
          firstName: true,
          lastName: true,
        },
        status: true,
      },
      relations: {
        createdBy: true,
      },
      // where: {
      //   createdBy: {
      //     firstName: 'Emran 5',
      //   },
      // },
      order: {
        id: 'DESC',
      },
      skip: 0,
      take: 100,
    };
    // return this.postsRepository.createQueryBuilder()
    return this.postsRepository.find(paginateOptions);
    // return (
    //   this.postsRepository
    //     .createQueryBuilder('post')
    //     .leftJoinAndSelect('post.createdBy', 'user')
    //     // .select(['post.id', 'post.content'])
    //     // .from(Post, 'post')
    //     // .groupBy('createdBy.id')
    //     .getMany()
    // );
  }

  findOne(id: number): Promise<Post> {
    return this.postsRepository.findOneBy({ id });
  }

  async create(body: any): Promise<Post> {
    const user = await this.userService.findOne(body.createdBy);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const post = new Post();
    post.content = body.content;
    post.createdBy = body.createdBy;
    post.status = body.status;
    return this.postsRepository.save(post);
  }

  async update(body: any): Promise<Post> {
    const user = await this.userService.findOne(body.createdBy);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const post = await this.findOne(body.id);
    post.content = body.content;
    post.createdBy = body.createdBy;
    post.status = body.status;
    return this.postsRepository.save(post);
  }

  delete(id: number): Promise<Post> | any {
    return this.postsRepository.delete(id);
  }
}
