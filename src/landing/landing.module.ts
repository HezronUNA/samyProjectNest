import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';
import { Landing } from './entities/landing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Landing])],
  controllers: [LandingController],
  providers: [LandingService],
  exports: [LandingService],
})
export class LandingModule {}
