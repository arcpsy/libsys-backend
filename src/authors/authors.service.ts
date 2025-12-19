import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create author
  async create(createAuthorDto: CreateAuthorDto) {
    const { birthDate, ...authorData } = createAuthorDto;

    return this.prisma.author.create({
      data: {
        ...authorData,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      },
    });
  }

  // List authors
  async findAll() {
    return this.prisma.author.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get author with books
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

    return {
      ...author,
      books: author.books.map((ba) => ba.book),
    };
  }

  // Update author
  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    // Ensure author exists
    await this.findOne(id);

    return this.prisma.author.update({
      where: { id },
      data: {
        name: updateAuthorDto.name,
        bio: updateAuthorDto.bio,
        birthDate: updateAuthorDto.birthDate
          ? new Date(updateAuthorDto.birthDate)
          : undefined,
      },
    });
  }

  // Delete author
  async remove(id: string) {
    // Ensure author exists
    await this.findOne(id);

    return this.prisma.author.delete({
      where: { id },
    });
  }
}
