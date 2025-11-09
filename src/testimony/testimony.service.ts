import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimony } from './entities/testimony.entity';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { UpdateTestimonyDto } from './dto/update-testimony.dto';
import { Landing } from 'src/landing/entities/landing.entity';

@Injectable()
export class TestimonyService {
  constructor(
    @InjectRepository(Testimony)
    private readonly testimonyRepository: Repository<Testimony>,
    @InjectRepository(Landing)
    private readonly landingRepository: Repository<Landing>,
  ) {}

  async create(createTestimonyDto: CreateTestimonyDto): Promise<Testimony> {
    const { landingId, ...testimonyData } = createTestimonyDto;

    const landing = await this.landingRepository.findOne({
      where: { id: landingId },
    });

    if (!landing) {
      throw new NotFoundException(`Landing con ID ${landingId} no encontrado`);
    }

    const testimony = this.testimonyRepository.create({
      ...testimonyData,
      landing,
    });

    return await this.testimonyRepository.save(testimony);
  }

  async findAll(): Promise<Testimony[]> {
    return await this.testimonyRepository.find({
      relations: ['landing'],
    });
  }

  async findOne(id: number): Promise<Testimony> {
    const testimony = await this.testimonyRepository.findOne({
      where: { id },
      relations: ['landing'],
    });

    if (!testimony) {
      throw new NotFoundException(`Testimony con ID ${id} no encontrado`);
    }

    return testimony;
  }

  async update(id: number, updateTestimonyDto: UpdateTestimonyDto): Promise<Testimony> {
    const testimony = await this.findOne(id);

    if (updateTestimonyDto.landingId) {
      const landing = await this.landingRepository.findOne({
        where: { id: updateTestimonyDto.landingId },
      });

      if (!landing) {
        throw new NotFoundException(
          `Landing con ID ${updateTestimonyDto.landingId} no encontrado`,
        );
      }

      testimony.landing = landing;
    }

    Object.assign(testimony, updateTestimonyDto);
    return await this.testimonyRepository.save(testimony);
  }

  async remove(id: number): Promise<void> {
    const testimony = await this.findOne(id);
    await this.testimonyRepository.remove(testimony);
  }
}
