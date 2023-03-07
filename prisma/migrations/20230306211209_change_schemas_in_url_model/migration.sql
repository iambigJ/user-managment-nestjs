/*
  Warnings:

  - The `loginFields` column on the `urls` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `signupFields` on the `urls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "urls" DROP COLUMN "loginFields",
ADD COLUMN     "loginFields" TEXT[],
DROP COLUMN "signupFields",
ADD COLUMN     "signupFields" JSONB NOT NULL;
