import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
