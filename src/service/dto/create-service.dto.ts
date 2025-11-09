import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsUrl()
  imagenUrl: string;

  @IsNotEmpty()
  @IsNumber()
  landingId: number;
}
