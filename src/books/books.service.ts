import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  // GET /books?search=
  async findAll(search?: string) {
    return this.prisma.book.findMany({
      where: search
        ? {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
      orderBy: {
        title: 'asc',
      },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  // GET /books/:id
  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        authors: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  // POST /books
  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        description: createBookDto.description,
        publishedAt: createBookDto.publishedAt,
        isbn: createBookDto.isbn,
        isAvailable: createBookDto.isAvailable ?? true,
      },
    });
  }

  // PATCH /books/:id
  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: {
        title: updateBookDto.title,
        description: updateBookDto.description,
        publishedAt: updateBookDto.publishedAt,
        isbn: updateBookDto.isbn,
        isAvailable: updateBookDto.isAvailable,
      },
    });
  }

  // DELETE /books/:id
  async remove(id: string) {
    // Explicitly remove relationships first
    await this.prisma.authorBook.deleteMany({
      where: { bookId: id },
    });

    // Then delete the book itself
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
