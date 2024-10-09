import { Injectable } from '@nestjs/common';
import { TimeDoctorApiService } from './time-doctor-api.service';

@Injectable()
export class TimeDoctorService {
  constructor(private readonly timeDoctorApiService: TimeDoctorApiService) {}

  public async getFiles() {
    const files = await this.timeDoctorApiService.getFiles();
    return files;
  }
}
