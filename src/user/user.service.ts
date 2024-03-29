import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> | any {
    const paginateOptions = {
      skip: 0,
      take: 100,
      withDeleted: true,
    };
    return this.usersRepository.find(paginateOptions);
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      withDeleted: true,
    });
  }

  create(body: any): Promise<User> {
    const user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.status = body.status;
    return this.usersRepository.save(user);
  }

  async update(body: any): Promise<User> {
    const user = await this.findOne(body.id);
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.status = body.status;
    return this.usersRepository.save(user);
  }

  delete(id: number): Promise<User> | any {
    return this.usersRepository.softDelete(id);
  }
}
