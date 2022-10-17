import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
	constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
	) { }

  findAll(): Promise<User[]> | any {
		return this.usersRepository.findBy({isActive: true});
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
	}
	
	create(body: any): Promise<User> {
		let user = new User();
		user.firstName = body.firstName;
		user.lastName = body.lastName;
		user.isActive = body.isActive;
		return this.usersRepository.save(user);
	}

	async update(body: any): Promise<User> {
		let user = await this.findOne(body.id);
		user.firstName = body.firstName;
		user.lastName = body.lastName;
		user.isActive = body.isActive;
		return this.usersRepository.save(user);
	}

  delete(id: number): Promise<User> | any {
    return this.usersRepository.softDelete(id);
  }
}
