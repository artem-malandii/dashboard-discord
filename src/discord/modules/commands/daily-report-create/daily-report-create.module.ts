import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildsEntity } from '../../../entities/guilds.entity';
import { DailyReportCreateService } from './daily-report-create.service';
import { ReportEntity } from '../../../entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuildsEntity, ReportEntity])],
  providers: [DailyReportCreateService],
  exports: [DailyReportCreateService],
})
export class DailyReportCreateModule {}
