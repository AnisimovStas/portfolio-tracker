import { MigrationInterface, QueryRunner } from "typeorm";

export class INIT1708690415324 implements MigrationInterface {
    name = 'INIT1708690415324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "transactionType" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "priceAtDate" double precision NOT NULL, "stackingPercentage" double precision, "description" character varying, "assetId" integer, "userId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "coinGeckoId" character varying, "name" character varying NOT NULL, "moexId" integer, "isin" character varying, "ticker" character varying NOT NULL, "icon" character varying NOT NULL, "currentPrice" double precision NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset_historical_price" ("date" character varying NOT NULL, "price" character varying NOT NULL, "assetId" integer, CONSTRAINT "PK_33fa22a7d64f54b94296a2fd3b4" PRIMARY KEY ("date"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_5a4563ae1b6c03c140e5ec17a6b" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asset_historical_price" ADD CONSTRAINT "FK_4617063e4415055f953401e07d9" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "asset_historical_price" DROP CONSTRAINT "FK_4617063e4415055f953401e07d9"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_5a4563ae1b6c03c140e5ec17a6b"`);
        await queryRunner.query(`DROP TABLE "asset_historical_price"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
