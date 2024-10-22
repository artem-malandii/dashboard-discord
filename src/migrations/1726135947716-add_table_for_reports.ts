import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableForReports1726135947716 implements MigrationInterface {
    name = 'AddTableForReports1726135947716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" character varying NOT NULL, "reporterId" character varying NOT NULL, "link" character varying NOT NULL, "date" character varying NOT NULL, "project" character varying NOT NULL, "report" character varying NOT NULL, "guildGuildId" character varying, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_afb1a6aba50c8386c2dcddc3723" FOREIGN KEY ("guildGuildId") REFERENCES "guilds"("guildId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_afb1a6aba50c8386c2dcddc3723"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
