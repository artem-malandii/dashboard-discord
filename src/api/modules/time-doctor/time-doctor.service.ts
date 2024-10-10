import { Injectable } from '@nestjs/common';
import { TimeDoctorApiService } from './time-doctor-api.service';
import { GetFilesQueryDTO } from './dto/get-files-query.dto';

@Injectable()
export class TimeDoctorService {
  constructor(private readonly timeDoctorApiService: TimeDoctorApiService) {}

  public async getFiles(queryDto: GetFilesQueryDTO) {
    const files = await this.timeDoctorApiService.getFiles(queryDto);
    return files;
  }

  public async getUsers() {
    const users = await this.timeDoctorApiService.getUsers();
    return users;
  }

  public async getProjects() {
    const projects = await this.timeDoctorApiService.getProjects();
    return projects;
  }
}
