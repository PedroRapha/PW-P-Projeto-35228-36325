-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngrCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "IngrCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "image" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "suggestedById" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Difficulty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "Difficulty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "creatorId" TEXT NOT NULL,
    "difficultyId" INTEGER NOT NULL,
    "image" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "steps" TEXT[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measure" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsInTheRecipe" (
    "recipeId" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "qnt" DOUBLE PRECISION NOT NULL,
    "measureId" INTEGER NOT NULL,

    CONSTRAINT "IngredientsInTheRecipe_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "IngrCategory_name_key" ON "IngrCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory_name_key" ON "RecipeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Difficulty_name_key" ON "Difficulty"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_creatorId_key" ON "Recipe"("name", "creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_name_key" ON "Measure"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_abbreviation_key" ON "Measure"("abbreviation");

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "IngrCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_suggestedById_fkey" FOREIGN KEY ("suggestedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RecipeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "Difficulty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsInTheRecipe" ADD CONSTRAINT "IngredientsInTheRecipe_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsInTheRecipe" ADD CONSTRAINT "IngredientsInTheRecipe_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "Measure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsInTheRecipe" ADD CONSTRAINT "IngredientsInTheRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
