import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  IAuthenticateBody,
  IAuthenticateResponse,
} from './interfaces/authenticate.interface';
import { FilesQueryParams } from './interfaces/files.interface';

@Injectable()
export class TimeDoctorApiService {
  private timeDoctorApiToken: string;

  constructor(private readonly httpService: HttpService) {}

  public async authenticate() {
    try {
      const url = `${process.env.TIME_DOCTOR_API_URL}/login`;
      const data: IAuthenticateBody = {
        email: process.env.TIME_DOCTOR_EMAIL || '',
        password: process.env.TIME_DOCTOR_PASSWORD || '',
      };

      const response = await firstValueFrom(
        this.httpService.post<IAuthenticateResponse>(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );

      this.timeDoctorApiToken = response.data.data.token;
    } catch (e) {
      console.log('Unable to authenticate via Time Doctor API: ', e);
    }
  }

  public async getFiles() {
    try {
      const queryParams: FilesQueryParams = {
        company: process.env.TIME_DOCTOR_COMPANY_ID || '',
        user: 'Zvv7IzEboLpAVxWQ', // TODO: get user id from frontend
      };
      const filteredParams: Record<string, string> = Object.fromEntries(
        Object.entries(queryParams).filter(([, v]) => v !== undefined) as [
          string,
          string,
        ][],
      );

      const query = new URLSearchParams(filteredParams).toString();
      const url = `${process.env.TIME_DOCTOR_API_URL}/files?${query}`;

      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${this.timeDoctorApiToken}`,
          },
        }),
      );

      return response.data;
    } catch (e) {
      console.log('Unable to get files: ', e);
    }
  }
}
