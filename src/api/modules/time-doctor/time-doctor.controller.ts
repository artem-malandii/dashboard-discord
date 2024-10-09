import { Controller, Get } from '@nestjs/common';
import { TimeDoctorService } from './time-doctor.service';

@Controller('time-doctor')
export class TimeDoctorController {
  constructor(private readonly timeDoctorService: TimeDoctorService) {}

  @Get('files')
  async getFiles() {
    return await this.timeDoctorService.getFiles();
  }
}
