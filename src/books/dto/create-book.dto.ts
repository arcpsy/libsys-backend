import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  IsDateString,
  IsNotEmpty,
  MaxLength,
  ArrayUnique,
  IsISBN,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  // Provided by the publisher, not auto-generated
  @IsString()
  @IsNotEmpty()
  @IsISBN()
  isbn: string;

  @IsDateString()
  publishedDate: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  // IDs of existing authors to link
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  authorIds?: string[];
}
