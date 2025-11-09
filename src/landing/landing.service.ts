import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Landing } from './entities/landing.entity';
import { CreateLandingDto } from './dto/create-landing.dto';
import { UpdateLandingDto } from './dto/update-landing.dto';

@Injectable()
export class LandingService {
  constructor(
    @InjectRepository(Landing)
    private readonly landingRepository: Repository<Landing>,
  ) {}

  async create(createLandingDto: CreateLandingDto): Promise<Landing> {
    const landing = this.landingRepository.create(createLandingDto);
    return await this.landingRepository.save(landing);
  }

  async findAll(): Promise<Landing[]> {
    return await this.landingRepository.find({
      relations: ['services', 'testimonies'],
    });
  }

  async findOne(id: number): Promise<Landing> {
    const landing = await this.landingRepository.findOne({
      where: { id },
      relations: ['services', 'testimonies'],
    });

    if (!landing) {
      throw new NotFoundException(`Landing con ID ${id} no encontrado`);
    }

    return landing;
  }

  async update(id: number, updateLandingDto: UpdateLandingDto): Promise<Landing> {
    const landing = await this.findOne(id);
    Object.assign(landing, updateLandingDto);
    return await this.landingRepository.save(landing);
  }

  async remove(id: number): Promise<void> {
    const landing = await this.findOne(id);
    await this.landingRepository.remove(landing);
  }
}
