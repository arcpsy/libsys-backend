import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorBookDto } from './dto/create-author-book.dto';

@Injectable()
export class AuthorBooksService {
  constructor(private readonly prisma: PrismaService) {}

  // POST /author-books
  async create(createAuthorBookDto: CreateAuthorBookDto) {
    const { authorId, bookId } = createAuthorBookDto;

    // 1️⃣ Ensure book exists
    const bookExists = await this.prisma.book.findUnique({
      where: { id: bookId },
      select: { id: true },
    });

    if (!bookExists) {
      throw new NotFoundException('Book not found');
    }

    // 2️⃣ Ensure author exists
    const authorExists = await this.prisma.author.findUnique({
      where: { id: authorId },
      select: { id: true },
    });

    if (!authorExists) {
      throw new NotFoundException('Author not found');
    }

    // 3️⃣ Prevent duplicate relationship
    const existingLink = await this.prisma.authorBook.findUnique({
      where: {
        bookId_authorId: {
          bookId,
          authorId,
        },
      },
    });

    if (existingLink) {
      throw new BadRequestException('Author is already linked to this book');
    }

    // 4️⃣ Create relationship explicitly
    return this.prisma.authorBook.create({
      data: {
        bookId,
        authorId,
      },
    });
  }

  // DELETE /author-books/:id
  async remove(id: string) {
    const link = await this.prisma.authorBook.findUnique({
      where: { id },
    });

    if (!link) {
      throw new NotFoundException('Author–Book link not found');
    }

    return this.prisma.authorBook.delete({
      where: { id },
    });
  }
}
