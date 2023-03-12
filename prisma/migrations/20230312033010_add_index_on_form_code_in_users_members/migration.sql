-- CreateIndex
CREATE INDEX "users-members_formCode_idx" ON "users-members" USING HASH ("formCode");
