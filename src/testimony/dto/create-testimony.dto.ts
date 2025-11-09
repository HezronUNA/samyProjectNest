import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateTestimonyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsUrl()
  clientAvatar: string;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsNotEmpty()
  @IsNumber()
  landingId: number;
}
