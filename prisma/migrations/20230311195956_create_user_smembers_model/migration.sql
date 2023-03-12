/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "users-members" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "signupFields" JSONB NOT NULL,
    "ban" BOOLEAN NOT NULL DEFAULT false,
    "formCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "users-members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_code_key" ON "urls"("code");

-- AddForeignKey
ALTER TABLE "users-members" ADD CONSTRAINT "users-members_formCode_fkey" FOREIGN KEY ("formCode") REFERENCES "urls"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users-members" ADD CONSTRAINT "users-members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
