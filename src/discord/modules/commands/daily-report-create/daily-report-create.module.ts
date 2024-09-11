import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildsEntity } from '../../../entities/guilds.entity';
import { DailyReportCreateService } from './daily-report-create.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildsEntity])],
  providers: [DailyReportCreateService],
  exports: [DailyReportCreateService],
})
export class DailyReportCreateModule {}
