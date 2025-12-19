import {
  IsOptional,
  IsString,
  IsDateString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
