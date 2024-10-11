import { Controller, Get, Query } from '@nestjs/common';
import { TimeDoctorService } from './time-doctor.service';
import { GetFilesQueryDTO } from './dto/get-files-query.dto';

@Controller('time-doctor')
export class TimeDoctorController {
  constructor(private readonly timeDoctorService: TimeDoctorService) {}

  @Get('files')
  async getFiles(@Query() queryDto: GetFilesQueryDTO) {
    return await this.timeDoctorService.getFiles(queryDto);
  }

  @Get('users')
  async getUsers() {
    return await this.timeDoctorService.getUsers();
  }

  @Get('projects')
  async getProjects() {
    return await this.timeDoctorService.getProjects();
  }
}
