-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "time" DATETIME NOT NULL,
    "table" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "req" TEXT NOT NULL
);
