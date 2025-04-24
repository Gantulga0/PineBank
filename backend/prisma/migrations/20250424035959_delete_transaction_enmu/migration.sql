/*
  Warnings:

  - You are about to drop the column `transactionType` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionType";

-- DropEnum
DROP TYPE "TransactionEnum";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
