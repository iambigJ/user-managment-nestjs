/*
  Warnings:

  - Added the required column `domain` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginFields` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loginUrl` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signupFields` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signupUrl` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "urls" ADD COLUMN     "domain" TEXT NOT NULL,
ADD COLUMN     "loginFields" TEXT NOT NULL,
ADD COLUMN     "loginUrl" TEXT NOT NULL,
ADD COLUMN     "signupFields" TEXT NOT NULL,
ADD COLUMN     "signupUrl" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
