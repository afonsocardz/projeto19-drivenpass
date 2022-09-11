-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credential_names" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "credentialId" INTEGER NOT NULL,

    CONSTRAINT "credential_names_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credential_names" ADD CONSTRAINT "credential_names_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
