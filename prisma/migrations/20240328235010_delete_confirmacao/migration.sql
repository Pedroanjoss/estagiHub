/*
  Warnings:

  - You are about to drop the column `confirmacao` on the `administradores` table. All the data in the column will be lost.
  - You are about to drop the column `confirmacao` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administradores" DROP COLUMN "confirmacao";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "confirmacao";
