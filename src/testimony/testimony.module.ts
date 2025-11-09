import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestimonyService } from './testimony.service';
import { TestimonyController } from './testimony.controller';
import { Testimony } from './entities/testimony.entity';
import { Landing } from 'src/landing/entities/landing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testimony, Landing])],
  controllers: [TestimonyController],
  providers: [TestimonyService],
  exports: [TestimonyService],
})
export class TestimonyModule {}
