import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ReportEntity } from './report.entity';

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

  @OneToMany(() => ReportEntity, (report) => report.guild)
  reports: ReportEntity[];
}
