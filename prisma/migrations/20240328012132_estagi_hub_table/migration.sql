-- CreateEnum
CREATE TYPE "Perfil" AS ENUM ('Administrador', 'Usuario');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ativo', 'Inativo');

-- CreateEnum
CREATE TYPE "StatusFerias" AS ENUM ('Aprovada', 'Reprovada');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "perfil" "Perfil" NOT NULL,
    "status" "Status" NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmacao" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estagiarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "estagiarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "saldoFerias" DOUBLE PRECISION,
    "dataRescisao" TIMESTAMP(3),
    "dataInicioFerias" TIMESTAMP(3),
    "dataFimFerias" TIMESTAMP(3),
    "statusFerias" "StatusFerias",
    "diasCorridos" INTEGER,
    "estagiarioId" TEXT NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administradores" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "perfil" "Perfil" NOT NULL,
    "status" "Status" NOT NULL,
    "senha" TEXT NOT NULL,
    "confirmacao" TEXT NOT NULL,

    CONSTRAINT "administradores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estagiarios_email_key" ON "estagiarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "administradores_email_key" ON "administradores"("email");

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_estagiarioId_fkey" FOREIGN KEY ("estagiarioId") REFERENCES "estagiarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
