import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'guilds' })
export class GuildsEntity {
  @PrimaryColumn()
  guildId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  dailyReportChannelId: string;

  @Column()
  ownerId: string;
}
