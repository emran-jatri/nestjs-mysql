import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  findAll(): Promise<Post[]> | any {
    const paginateOptions = {
      skip: 0,
      take: 100,
			select: {
				id: true,
				content: true,
				createdBy: {
					id: true,
					firstName: true,
				}
      },
			relations: {
				createdBy: true,
      },
    };
    return this.postsRepository.find(paginateOptions);
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
