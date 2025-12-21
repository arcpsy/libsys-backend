import { Test, TestingModule } from '@nestjs/testing';
import { AuthorBooksService } from './author-books.service';

describe('AuthorBooksService', () => {
  let service: AuthorBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorBooksService],
    }).compile();

    service = module.get<AuthorBooksService>(AuthorBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
