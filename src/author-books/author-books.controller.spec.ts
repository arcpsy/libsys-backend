import { Test, TestingModule } from '@nestjs/testing';
import { AuthorBooksController } from './author-books.controller';
import { AuthorBooksService } from './author-books.service';

describe('AuthorBooksController', () => {
  let controller: AuthorBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorBooksController],
      providers: [AuthorBooksService],
    }).compile();

    controller = module.get<AuthorBooksController>(AuthorBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
