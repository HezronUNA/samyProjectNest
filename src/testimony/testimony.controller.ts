import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { UpdateTestimonyDto } from './dto/update-testimony.dto';

@Controller('testimony')
export class TestimonyController {
  constructor(private readonly testimonyService: TestimonyService) {}

  @Post()
  create(@Body() createTestimonyDto: CreateTestimonyDto) {
    return this.testimonyService.create(createTestimonyDto);
  }

  @Get()
  findAll() {
    return this.testimonyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testimonyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTestimonyDto: UpdateTestimonyDto,
  ) {
    return this.testimonyService.update(id, updateTestimonyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testimonyService.remove(id);
  }
}
