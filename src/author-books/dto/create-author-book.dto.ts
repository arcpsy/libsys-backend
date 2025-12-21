import { IsUUID } from 'class-validator';

export class CreateAuthorBookDto {
  @IsUUID()
  bookId: string;

  @IsUUID()
  authorId: string;
}
