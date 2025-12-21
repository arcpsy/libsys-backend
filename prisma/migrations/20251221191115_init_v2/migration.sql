/*
  Warnings:

  - You are about to drop the column `publishedDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `BookAuthor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookAuthor" DROP CONSTRAINT "BookAuthor_authorId_fkey";

-- DropForeignKey
ALTER TABLE "BookAuthor" DROP CONSTRAINT "BookAuthor_bookId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishedDate",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ALTER COLUMN "isbn" DROP NOT NULL;

-- DropTable
DROP TABLE "BookAuthor";

-- CreateTable
CREATE TABLE "AuthorBook" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthorBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuthorBook_bookId_idx" ON "AuthorBook"("bookId");

-- CreateIndex
CREATE INDEX "AuthorBook_authorId_idx" ON "AuthorBook"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorBook_bookId_authorId_key" ON "AuthorBook"("bookId", "authorId");

-- CreateIndex
CREATE INDEX "Author_name_idx" ON "Author"("name");

-- CreateIndex
CREATE INDEX "Book_title_idx" ON "Book"("title");

-- AddForeignKey
ALTER TABLE "AuthorBook" ADD CONSTRAINT "AuthorBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorBook" ADD CONSTRAINT "AuthorBook_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
