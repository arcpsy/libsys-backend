import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  // GET /authors?search=
  async findAll(search?: string) {
    return this.prisma.author.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
      orderBy: {
        name: 'asc',
      },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  // GET /authors/:id
  async findOne(id: string) {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  // POST /authors
  async create(createAuthorDto: CreateAuthorDto) {
    return this.prisma.author.create({
      data: {
        name: createAuthorDto.name,
        bio: createAuthorDto.bio,
        birthDate: createAuthorDto.birthDate,
      },
    });
  }

  // PATCH /authors/:id
  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.prisma.author.update({
      where: { id },
      data: {
        name: updateAuthorDto.name,
        bio: updateAuthorDto.bio,
        birthDate: updateAuthorDto.birthDate,
      },
    });
  }

  // DELETE /authors/:id
  async remove(id: string) {
    // Check for linked books
    const linkedBooksCount = await this.prisma.authorBook.count({
      where: { authorId: id },
    });

    if (linkedBooksCount > 0) {
      throw new BadRequestException('Cannot delete author with linked books');
    }

    return this.prisma.author.delete({
      where: { id },
    });
  }
}
