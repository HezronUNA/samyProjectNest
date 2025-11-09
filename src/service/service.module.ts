import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entitites/service.entity';
import { Landing } from 'src/landing/entities/landing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Landing])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
