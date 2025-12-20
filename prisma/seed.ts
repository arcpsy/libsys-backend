import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

// Prisma adapter setup
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seed');

  // Clear existing data (order matters)
  await prisma.bookAuthor.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  console.log('Cleared existing data');

  // ======================
  // Seed authors
  // ======================
  await prisma.author.createMany({
    data: [
      {
        id: 'author-burnett',
        name: 'Frances Hodgson Burnett',
        bio: 'English-American novelist and playwright.',
        birthDate: new Date('1849-11-24'),
      },
      {
        id: 'author-carroll',
        name: 'Lewis Carroll',
        bio: 'English writer, mathematician, and photographer.',
        birthDate: new Date('1832-01-27'),
      },
      {
        id: 'author-christie',
        name: 'Agatha Christie',
        bio: 'English writer known for detective novels.',
        birthDate: new Date('1890-09-15'),
      },
      {
        id: 'author-rowling',
        name: 'J.K. Rowling',
        bio: 'British author, best known for Harry Potter.',
        birthDate: new Date('1965-07-31'),
      },
      {
        id: 'author-gaiman',
        name: 'Neil Gaiman',
        bio: 'English author of fantasy and speculative fiction.',
        birthDate: new Date('1960-11-10'),
      },
      {
        id: 'author-twain',
        name: 'Mark Twain',
        bio: 'American writer and humorist.',
        birthDate: new Date('1835-11-30'),
      },
      {
        id: 'author-hume',
        name: 'Fergus Hume',
        bio: 'English novelist and playwright.',
        birthDate: new Date('1859-07-08'),
      },
      {
        id: 'author-kjv',
        name: 'Various Authors',
        bio: 'Biblical texts translated in the King James Version.',
        birthDate: null,
      },
    ],
  });
  console.log('Seeded authors');

  // ======================
  // Seed books
  // ======================
  await prisma.book.createMany({
    data: [
      // Classic literature
      {
        id: 'book-secret-garden',
        title: 'The Secret Garden',
        isbn: '9780143039433',
        publishedDate: new Date('1911-01-01'),
        description: 'A classic novel about growth, healing, and friendship.',
      },
      {
        id: 'book-alice',
        title: "Alice's Adventures in Wonderland",
        isbn: '9780141439761',
        publishedDate: new Date('1865-11-26'),
        description: 'A whimsical fantasy exploring imagination and logic.',
      },

      // Agatha Christie (selected best)
      {
        id: 'book-styles',
        title: 'The Mysterious Affair at Styles',
        isbn: '9780062073556',
        publishedDate: new Date('1920-10-01'),
        description: 'Poirot’s first case.',
      },
      {
        id: 'book-roger-ackroyd',
        title: 'The Murder of Roger Ackroyd',
        isbn: '9780062073563',
        publishedDate: new Date('1926-06-01'),
        description: 'A groundbreaking detective novel.',
      },
      {
        id: 'book-abc',
        title: 'The ABC Murders',
        isbn: '9780062073587',
        publishedDate: new Date('1936-01-06'),
        description: 'A serial killer mystery.',
      },
      {
        id: 'book-cards',
        title: 'Cards on the Table',
        isbn: '9780062073617',
        publishedDate: new Date('1936-11-02'),
        description: 'A psychological murder mystery.',
      },
      {
        id: 'book-clouds',
        title: 'Death in the Clouds',
        isbn: '9780062073600',
        publishedDate: new Date('1935-03-01'),
        description: 'A murder aboard an airplane.',
      },
      {
        id: 'book-christmas',
        title: "Poirot's Christmas",
        isbn: '9780062073570',
        publishedDate: new Date('1938-12-19'),
        description: 'A locked-room Christmas mystery.',
      },
      {
        id: 'book-appointment',
        title: 'Appointment with Death',
        isbn: '9780062073594',
        publishedDate: new Date('1938-05-02'),
        description: 'A psychological mystery set abroad.',
      },
      {
        id: 'book-mcginty',
        title: "Mrs. McGinty's Dead",
        isbn: '9780062073624',
        publishedDate: new Date('1952-02-11'),
        description: 'A case involving a seemingly obvious murder.',
      },
      {
        id: 'book-dumb-witness',
        title: 'Dumb Witness',
        isbn: '9780062073631',
        publishedDate: new Date('1937-07-05'),
        description: 'A mystery involving a silent witness.',
      },

      // Harry Potter
      {
        id: 'book-hp1',
        title: "Harry Potter and the Sorcerer's Stone",
        isbn: '9780439708180',
        publishedDate: new Date('1997-06-26'),
        description: 'The beginning of the wizarding world.',
      },
      {
        id: 'book-hp3',
        title: 'Harry Potter and the Prisoner of Azkaban',
        isbn: '9780439655484',
        publishedDate: new Date('1999-07-08'),
        description: 'A darker chapter in the series.',
      },
      {
        id: 'book-hp4',
        title: 'Harry Potter and the Goblet of Fire',
        isbn: '9780439139601',
        publishedDate: new Date('2000-07-08'),
        description: 'The Triwizard Tournament.',
      },
      {
        id: 'book-hp5',
        title: 'Harry Potter and the Order of the Phoenix',
        isbn: '9780439358071',
        publishedDate: new Date('2003-06-21'),
        description: 'Resistance and truth.',
      },
      {
        id: 'book-hp6',
        title: 'Harry Potter and the Half-Blood Prince',
        isbn: '9780439785969',
        publishedDate: new Date('2005-07-16'),
        description: 'Secrets of the past.',
      },
      {
        id: 'book-hp7',
        title: 'Harry Potter and the Deathly Hallows',
        isbn: '9780545010221',
        publishedDate: new Date('2007-07-21'),
        description: 'The final battle.',
      },

      // Other fiction
      {
        id: 'book-coraline',
        title: 'Coraline',
        isbn: '9780380807345',
        publishedDate: new Date('2002-08-04'),
        description: 'A dark fantasy about courage.',
      },
      {
        id: 'book-double-barrel',
        title: 'A Double Barrelled Detective Story',
        isbn: '9780486282631',
        publishedDate: new Date('1902-01-01'),
        description: 'A humorous detective tale.',
      },
      {
        id: 'book-hansom',
        title: 'The Mystery of the Hansom Cab',
        isbn: '9780140436358',
        publishedDate: new Date('1886-01-01'),
        description: 'An early detective novel.',
      },
      {
        id: 'book-silent-house',
        title: 'The Silent House',
        isbn: '9781605973295',
        publishedDate: new Date('1899-01-01'),
        description: 'A classic mystery story.',
      },

      // Bible (KJV)
      {
        id: 'book-pentateuch',
        title: 'The Holy Bible (KJV): The Pentateuch',
        isbn: '9781619700001',
        publishedDate: new Date('1611-01-01'),
        description: 'The first five books of the Bible.',
      },
      {
        id: 'book-psalms',
        title: 'The Holy Bible (KJV): Book of Psalms',
        isbn: '9781619700002',
        publishedDate: new Date('1611-01-01'),
        description: 'A collection of sacred songs and prayers.',
      },
      {
        id: 'book-nt',
        title: 'The Holy Bible (KJV): New Testament',
        isbn: '9781619700003',
        publishedDate: new Date('1611-01-01'),
        description: 'The life and teachings of Jesus Christ.',
      },
    ],
  });
  console.log('Seeded books');

  // ======================
  // Link authors and books
  // ======================
  await prisma.bookAuthor.createMany({
    data: [
      { authorId: 'author-burnett', bookId: 'book-secret-garden' },
      { authorId: 'author-carroll', bookId: 'book-alice' },

      // Agatha Christie
      { authorId: 'author-christie', bookId: 'book-styles' },
      { authorId: 'author-christie', bookId: 'book-roger-ackroyd' },
      { authorId: 'author-christie', bookId: 'book-abc' },
      { authorId: 'author-christie', bookId: 'book-cards' },
      { authorId: 'author-christie', bookId: 'book-clouds' },
      { authorId: 'author-christie', bookId: 'book-christmas' },
      { authorId: 'author-christie', bookId: 'book-appointment' },
      { authorId: 'author-christie', bookId: 'book-mcginty' },
      { authorId: 'author-christie', bookId: 'book-dumb-witness' },

      // Rowling
      { authorId: 'author-rowling', bookId: 'book-hp1' },
      { authorId: 'author-rowling', bookId: 'book-hp3' },
      { authorId: 'author-rowling', bookId: 'book-hp4' },
      { authorId: 'author-rowling', bookId: 'book-hp5' },
      { authorId: 'author-rowling', bookId: 'book-hp6' },
      { authorId: 'author-rowling', bookId: 'book-hp7' },

      // Others
      { authorId: 'author-gaiman', bookId: 'book-coraline' },
      { authorId: 'author-twain', bookId: 'book-double-barrel' },
      { authorId: 'author-hume', bookId: 'book-hansom' },
      { authorId: 'author-hume', bookId: 'book-silent-house' },

      // Bible
      { authorId: 'author-kjv', bookId: 'book-pentateuch' },
      { authorId: 'author-kjv', bookId: 'book-psalms' },
      { authorId: 'author-kjv', bookId: 'book-nt' },
    ],
  });
  console.log('Linked authors and books');

  console.log('Database seed completed');
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
