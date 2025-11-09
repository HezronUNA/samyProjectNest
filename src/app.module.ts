import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { LandingModule } from './landing/landing.module';
import { ServiceModule } from './service/service.module';
import { TestimonyModule } from './testimony/testimony.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'samy_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    LandingModule,
    ServiceModule,
    TestimonyModule,
  ],
})
export class AppModule { }
