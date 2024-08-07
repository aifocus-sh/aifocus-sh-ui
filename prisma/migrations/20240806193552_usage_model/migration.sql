-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT,
    "endpoint" TEXT NOT NULL,
    "parameters" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "model" TEXT NOT NULL
);
