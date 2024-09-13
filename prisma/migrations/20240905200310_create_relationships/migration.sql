/*
  Warnings:

  - You are about to drop the `check-ins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "check-ins";

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "gyn_id" TEXT NOT NULL,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gyn_id_fkey" FOREIGN KEY ("gyn_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
