import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GuildsEntity } from './guilds.entity';

@Entity({ name: 'report' })
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reporterId: string;

  @Column()
  link: string;

  @Column()
  date: string;

  @Column()
  project: string;

  @Column()
  report: string;

  @ManyToOne(() => GuildsEntity, (guild) => guild.reports)
  guild: GuildsEntity;
}
