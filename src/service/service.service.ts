import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entitites/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Landing } from 'src/landing/entities/landing.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Landing)
    private readonly landingRepository: Repository<Landing>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const { landingId, ...serviceData } = createServiceDto;

    const landing = await this.landingRepository.findOne({
      where: { id: landingId },
    });

    if (!landing) {
      throw new NotFoundException(`Landing con ID ${landingId} no encontrado`);
    }

    const service = this.serviceRepository.create({
      ...serviceData,
      landing,
    });

    return await this.serviceRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find({
      relations: ['landing'],
    });
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['landing'],
    });

    if (!service) {
      throw new NotFoundException(`Service con ID ${id} no encontrado`);
    }

    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);

    if (updateServiceDto.landingId) {
      const landing = await this.landingRepository.findOne({
        where: { id: updateServiceDto.landingId },
      });

      if (!landing) {
        throw new NotFoundException(
          `Landing con ID ${updateServiceDto.landingId} no encontrado`,
        );
      }

      service.landing = landing;
    }

    Object.assign(service, updateServiceDto);
    return await this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }
}
