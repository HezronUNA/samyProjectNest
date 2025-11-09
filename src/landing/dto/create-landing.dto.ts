import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateLandingDto {
  @IsNotEmpty()
  @IsUrl()
  logoUrl: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
