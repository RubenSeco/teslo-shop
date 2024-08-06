-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_countryId_fkey";

-- AlterTable
ALTER TABLE "UserAddress" ALTER COLUMN "countryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
