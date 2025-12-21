import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  // Create book
  async create(createBookDto: CreateBookDto) {
    const { authorIds, publishedDate, ...bookData } = createBookDto;

    return this.prisma.book.create({
      data: {
        ...bookData,
        publishedDate: new Date(publishedDate),
        authors: authorIds
          ? {
              create: authorIds.map((authorId) => ({
                author: { connect: { id: authorId } },
              })),
            }
          : undefined,
      },
    });
  }

  // List books
  async findAll() {
    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get book with authors
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

    return {
      ...book,
      authors: book.authors.map((ba) => ba.author),
    };
  }

  // Update book
  async update(id: string, updateBookDto: UpdateBookDto) {
    // Ensure book exists
    await this.findOne(id);

    const { authorIds, publishedDate, ...bookData } = updateBookDto;

    // Update book fields
    await this.prisma.book.update({
      where: { id },
      data: {
        ...bookData,
        publishedDate: publishedDate ? new Date(publishedDate) : undefined,
      },
    });

    // Handle author relationship updates if authorIds provided
    if (authorIds && Array.isArray(authorIds)) {
      // Delete all existing author relationships
      await this.prisma.bookAuthor.deleteMany({
        where: { bookId: id },
      });

      // Create new relationships
      await this.prisma.bookAuthor.createMany({
        data: authorIds.map((authorId) => ({
          bookId: id,
          authorId,
        })),
      });
    }

    // Return updated book with authors
    return this.findOne(id);
  }

  // Delete book
  async remove(id: string) {
    // Ensure book exists
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }

  // Add author to book
  async addAuthor(bookId: string, authorId: string) {
    // Ensure book exists
    await this.findOne(bookId);

    // Ensure author exists
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    await this.prisma.bookAuthor.create({
      data: {
        bookId,
        authorId,
      },
    });
  }

  // Remove author from book
  async removeAuthor(bookId: string, authorId: string) {
    await this.prisma.bookAuthor.delete({
      where: {
        bookId_authorId: {
          bookId,
          authorId,
        },
      },
    });
  }
}
