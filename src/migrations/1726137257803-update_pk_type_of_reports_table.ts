import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePkTypeOfReportsTable1726137257803 implements MigrationInterface {
    name = 'UpdatePkTypeOfReportsTable1726137257803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "PK_99e4d0bea58cba73c57f935a546"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "PK_99e4d0bea58cba73c57f935a546"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id")`);
    }

}
