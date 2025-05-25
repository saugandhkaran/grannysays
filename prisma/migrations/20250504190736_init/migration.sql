-- CreateTable
CREATE TABLE "Tip" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tipNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipTag" (
    "tipId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TipTag_pkey" PRIMARY KEY ("tipId","tagId")
);

-- CreateTable
CREATE TABLE "GrannySaying" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "saying" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "tipId" TEXT NOT NULL,

    CONSTRAINT "GrannySaying_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "TipTag" ADD CONSTRAINT "TipTag_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TipTag" ADD CONSTRAINT "TipTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrannySaying" ADD CONSTRAINT "GrannySaying_tipId_fkey" FOREIGN KEY ("tipId") REFERENCES "Tip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
