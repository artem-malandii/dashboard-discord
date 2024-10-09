import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ReportsModule } from './modules/reports/reports.module';
import { TimeDoctorModule } from './modules/time-doctor/time-doctor.module';

@Module({
  imports: [ReportsModule, TimeDoctorModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
