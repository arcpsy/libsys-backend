import 'dotenv/config';
import { randomUUID } from 'crypto';
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

// ======================
// UUIDs
// ======================
const authorIds = {
  burnett: randomUUID(),
  carroll: randomUUID(),
  christie: randomUUID(),
  rowling: randomUUID(),
  gaiman: randomUUID(),
  twain: randomUUID(),
  hume: randomUUID(),
  kjv: randomUUID(),
};

const bookIds = {
  secretGarden: randomUUID(),
  alice: randomUUID(),
  styles: randomUUID(),
  rogerAckroyd: randomUUID(),
  abc: randomUUID(),
  cards: randomUUID(),
  clouds: randomUUID(),
  christmas: randomUUID(),
  appointment: randomUUID(),
  mcginty: randomUUID(),
  dumbWitness: randomUUID(),
  hp1: randomUUID(),
  hp3: randomUUID(),
  hp4: randomUUID(),
  hp5: randomUUID(),
  hp6: randomUUID(),
  hp7: randomUUID(),
  coraline: randomUUID(),
  doubleBarrel: randomUUID(),
  hansom: randomUUID(),
  silentHouse: randomUUID(),
  pentateuch: randomUUID(),
  psalms: randomUUID(),
  nt: randomUUID(),
};

// ======================
// Seed Data
// ======================
const authors = [
  {
    id: authorIds.burnett,
    name: 'Frances Hodgson Burnett',
    bio: 'English-American novelist and playwright.',
    birthDate: new Date('1849-11-24'),
  },
  {
    id: authorIds.carroll,
    name: 'Lewis Carroll',
    bio: 'English writer, mathematician, and photographer.',
    birthDate: new Date('1832-01-27'),
  },
  {
    id: authorIds.christie,
    name: 'Agatha Christie',
    bio: 'English writer known for detective novels.',
    birthDate: new Date('1890-09-15'),
  },
  {
    id: authorIds.rowling,
    name: 'J.K. Rowling',
    bio: 'British author, best known for Harry Potter.',
    birthDate: new Date('1965-07-31'),
  },
  {
    id: authorIds.gaiman,
    name: 'Neil Gaiman',
    bio: 'English author of fantasy and speculative fiction.',
    birthDate: new Date('1960-11-10'),
  },
  {
    id: authorIds.twain,
    name: 'Mark Twain',
    bio: 'American writer and humorist.',
    birthDate: new Date('1835-11-30'),
  },
  {
    id: authorIds.hume,
    name: 'Fergus Hume',
    bio: 'English novelist and playwright.',
    birthDate: new Date('1859-07-08'),
  },
  {
    id: authorIds.kjv,
    name: 'Various Authors',
    bio: 'Biblical texts translated in the King James Version.',
    birthDate: null,
  },
];

const books = [
  {
    id: bookIds.secretGarden,
    title: 'The Secret Garden',
    isbn: '9780143131849',
    publishedDate: new Date('1911-01-01'),
    description: 'A classic novel about growth, healing, and friendship.',
  },
  {
    id: bookIds.alice,
    title: "Alice's Adventures in Wonderland",
    isbn: '9780141321073',
    publishedDate: new Date('1865-11-26'),
    description: 'A whimsical fantasy exploring imagination and logic.',
  },

  // Agatha Christie
  {
    id: bookIds.styles,
    title: 'The Mysterious Affair at Styles',
    isbn: '9780007527496',
    publishedDate: new Date('1920-10-01'),
    description: "Poirot's first case.",
  },
  {
    id: bookIds.rogerAckroyd,
    title: 'The Murder of Roger Ackroyd',
    isbn: '9780007136834',
    publishedDate: new Date('1926-06-01'),
    description: 'A groundbreaking detective novel.',
  },
  {
    id: bookIds.abc,
    title: 'The ABC Murders',
    isbn: '9781579126247',
    publishedDate: new Date('1936-01-06'),
    description: 'A serial killer mystery.',
  },
  {
    id: bookIds.cards,
    title: 'Cards on the Table',
    isbn: '9780062073624',
    publishedDate: new Date('1936-11-02'),
    description: 'A psychological murder mystery.',
  },
  {
    id: bookIds.clouds,
    title: 'Death in the Clouds',
    isbn: '9780008129538',
    publishedDate: new Date('1935-03-01'),
    description: 'A murder aboard an airplane.',
  },
  {
    id: bookIds.christmas,
    title: "Poirot's Christmas",
    isbn: '9780062073570',
    publishedDate: new Date('1938-12-19'),
    description: 'A locked-room Christmas mystery.',
  },
  {
    id: bookIds.appointment,
    title: 'Appointment with Death',
    isbn: '9780062073594',
    publishedDate: new Date('1938-05-02'),
    description: 'A psychological mystery set abroad.',
  },
  {
    id: bookIds.mcginty,
    title: "Mrs. McGinty's Dead",
    isbn: '9780008129569',
    publishedDate: new Date('1952-02-11'),
    description: 'A case involving a seemingly obvious murder.',
  },
  {
    id: bookIds.dumbWitness,
    title: 'Dumb Witness',
    isbn: '9780008129576',
    publishedDate: new Date('1937-07-05'),
    description: 'A mystery involving a silent witness.',
  },

  // Harry Potter
  {
    id: bookIds.hp1,
    title: "Harry Potter and the Sorcerer's Stone",
    isbn: '9780439708180',
    publishedDate: new Date('1997-06-26'),
    description: 'The beginning of the wizarding world.',
  },
  {
    id: bookIds.hp3,
    title: 'Harry Potter and the Prisoner of Azkaban',
    isbn: '9780439655484',
    publishedDate: new Date('1999-07-08'),
    description: 'A darker chapter in the series.',
  },
  {
    id: bookIds.hp4,
    title: 'Harry Potter and the Goblet of Fire',
    isbn: '9780439139601',
    publishedDate: new Date('2000-07-08'),
    description: 'The Triwizard Tournament.',
  },
  {
    id: bookIds.hp5,
    title: 'Harry Potter and the Order of the Phoenix',
    isbn: '9780439358071',
    publishedDate: new Date('2003-06-21'),
    description: 'Resistance and truth.',
  },
  {
    id: bookIds.hp6,
    title: 'Harry Potter and the Half-Blood Prince',
    isbn: '9780439785969',
    publishedDate: new Date('2005-07-16'),
    description: 'Secrets of the past.',
  },
  {
    id: bookIds.hp7,
    title: 'Harry Potter and the Deathly Hallows',
    isbn: '9780545010221',
    publishedDate: new Date('2007-07-21'),
    description: 'The final battle.',
  },

  // Other fiction
  {
    id: bookIds.coraline,
    title: 'Coraline',
    isbn: '9780380807345',
    publishedDate: new Date('2002-08-04'),
    description: 'A dark fantasy about courage.',
  },
  {
    id: bookIds.doubleBarrel,
    title: 'A Double Barrelled Detective Story',
    isbn: '9780486282631',
    publishedDate: new Date('1902-01-01'),
    description: 'A humorous detective tale.',
  },
  {
    id: bookIds.hansom,
    title: 'The Mystery of the Hansom Cab',
    isbn: '9780140436358',
    publishedDate: new Date('1886-01-01'),
    description: 'An early detective novel.',
  },
  {
    id: bookIds.silentHouse,
    title: 'The Silent House',
    isbn: '9781605973295',
    publishedDate: new Date('1899-01-01'),
    description: 'A classic mystery story.',
  },

  // Bible (KJV)
  {
    id: bookIds.pentateuch,
    title: 'The Holy Bible (KJV): The Pentateuch',
    isbn: '9781619700001',
    publishedDate: new Date('1611-01-01'),
    description: 'The first five books of the Bible.',
  },
  {
    id: bookIds.psalms,
    title: 'The Holy Bible (KJV): Book of Psalms',
    isbn: '9781619700002',
    publishedDate: new Date('1611-01-01'),
    description: 'A collection of sacred songs and prayers.',
  },
  {
    id: bookIds.nt,
    title: 'The Holy Bible (KJV): New Testament',
    isbn: '9781619700003',
    publishedDate: new Date('1611-01-01'),
    description: 'The life and teachings of Jesus Christ.',
  },
];

const bookAuthors = [
  { authorId: authorIds.burnett, bookId: bookIds.secretGarden },
  { authorId: authorIds.carroll, bookId: bookIds.alice },

  { authorId: authorIds.christie, bookId: bookIds.styles },
  { authorId: authorIds.christie, bookId: bookIds.rogerAckroyd },
  { authorId: authorIds.christie, bookId: bookIds.abc },
  { authorId: authorIds.christie, bookId: bookIds.cards },
  { authorId: authorIds.christie, bookId: bookIds.clouds },
  { authorId: authorIds.christie, bookId: bookIds.christmas },
  { authorId: authorIds.christie, bookId: bookIds.appointment },
  { authorId: authorIds.christie, bookId: bookIds.mcginty },
  { authorId: authorIds.christie, bookId: bookIds.dumbWitness },

  { authorId: authorIds.rowling, bookId: bookIds.hp1 },
  { authorId: authorIds.rowling, bookId: bookIds.hp3 },
  { authorId: authorIds.rowling, bookId: bookIds.hp4 },
  { authorId: authorIds.rowling, bookId: bookIds.hp5 },
  { authorId: authorIds.rowling, bookId: bookIds.hp6 },
  { authorId: authorIds.rowling, bookId: bookIds.hp7 },

  { authorId: authorIds.gaiman, bookId: bookIds.coraline },
  { authorId: authorIds.twain, bookId: bookIds.doubleBarrel },
  { authorId: authorIds.hume, bookId: bookIds.hansom },
  { authorId: authorIds.hume, bookId: bookIds.silentHouse },

  { authorId: authorIds.kjv, bookId: bookIds.pentateuch },
  { authorId: authorIds.kjv, bookId: bookIds.psalms },
  { authorId: authorIds.kjv, bookId: bookIds.nt },
];

// ======================
// Main
// ======================
async function main() {
  console.log('Starting database seed');

  await prisma.bookAuthor.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  console.log('Cleared existing data');

  await prisma.author.createMany({ data: authors });
  console.log('Seeded authors');

  await prisma.book.createMany({ data: books });
  console.log('Seeded books');

  await prisma.bookAuthor.createMany({ data: bookAuthors });
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
