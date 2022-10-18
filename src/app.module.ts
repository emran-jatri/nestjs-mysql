import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
		TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs-mysql',
      entities: [],
			synchronize: true,
			autoLoadEntities: true,
    }),
		UserModule,
		PostModule,
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
