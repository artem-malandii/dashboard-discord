import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from '../../../discord/entities/report.entity';
import { HttpModule } from '@nestjs/axios';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity]), HttpModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
