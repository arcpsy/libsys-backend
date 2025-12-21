import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

import { AuthorBooksService } from './author-books.service';
import { CreateAuthorBookDto } from './dto/create-author-book.dto';

@Controller('author-books')
export class AuthorBooksController {
  constructor(private readonly authorBooksService: AuthorBooksService) {}

  @Post()
  create(@Body() createAuthorBookDto: CreateAuthorBookDto) {
    return this.authorBooksService.create(createAuthorBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorBooksService.remove(id);
  }
}
