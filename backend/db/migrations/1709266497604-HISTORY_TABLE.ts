import { MigrationInterface, QueryRunner } from "typeorm";

export class HISTORYTABLE1709266497604 implements MigrationInterface {
    name = 'HISTORYTABLE1709266497604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "history_of_asset_in_portfolio" ("id" SERIAL NOT NULL, "priceValue" double precision NOT NULL, "profit" double precision NOT NULL, "earnedAmountByStacking" double precision, "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "assetId" integer, CONSTRAINT "PK_3d02d19ea064090dd1d476c38b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "history_of_asset_in_portfolio" ADD CONSTRAINT "FK_cc187e31528e474783da36bcf4e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history_of_asset_in_portfolio" ADD CONSTRAINT "FK_b5aa567cec584c1e4c2707f5b71" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history_of_asset_in_portfolio" DROP CONSTRAINT "FK_b5aa567cec584c1e4c2707f5b71"`);
        await queryRunner.query(`ALTER TABLE "history_of_asset_in_portfolio" DROP CONSTRAINT "FK_cc187e31528e474783da36bcf4e"`);
        await queryRunner.query(`DROP TABLE "history_of_asset_in_portfolio"`);
    }

}
