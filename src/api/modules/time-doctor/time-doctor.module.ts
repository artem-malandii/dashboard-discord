import { Module, OnModuleInit } from '@nestjs/common';
import { TimeDoctorService } from './time-doctor.service';
import { HttpModule } from '@nestjs/axios';
import { TimeDoctorApiService } from './time-doctor-api.service';
import { TimeDoctorController } from './time-doctor.controller';

@Module({
  imports: [HttpModule],
  controllers: [TimeDoctorController],
  providers: [TimeDoctorService, TimeDoctorApiService],
})
export class TimeDoctorModule implements OnModuleInit {
  constructor(private readonly timeDoctorApiService: TimeDoctorApiService) {}

  onModuleInit() {
    this.timeDoctorApiService.authenticate();
  }
}
