import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  // ───────────────
  // Relationships
  // ───────────────

  @Post(':bookId/authors/:authorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  addAuthor(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.booksService.addAuthor(bookId, authorId);
  }

  @Delete(':bookId/authors/:authorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAuthor(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.booksService.removeAuthor(bookId, authorId);
  }
}
