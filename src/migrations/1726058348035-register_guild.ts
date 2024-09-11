import { MigrationInterface, QueryRunner } from "typeorm";

export class RegisterGuild1726058348035 implements MigrationInterface {
    name = 'RegisterGuild1726058348035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guilds" ("guildId" character varying NOT NULL, "name" character varying NOT NULL, "dailyReportChannelId" character varying, "ownerId" character varying NOT NULL, CONSTRAINT "PK_0699c7df346fa7be967e7eebd51" PRIMARY KEY ("guildId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "guilds"`);
    }

}
