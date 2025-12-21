import { Module } from '@nestjs/common';
import { AuthorBooksController } from './author-books.controller';
import { AuthorBooksService } from './author-books.service';

@Module({
  controllers: [AuthorBooksController],
  providers: [AuthorBooksService],
})
export class AuthorBooksModule {}
