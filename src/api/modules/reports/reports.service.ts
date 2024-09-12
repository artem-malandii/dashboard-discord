import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { ReportEntity } from '../../../discord/entities/report.entity';

@Injectable()
export class ReportsService {
  private readonly discordApiUrl = 'https://discord.com/api/v10';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ReportEntity)
    private readonly reportsRepository: Repository<ReportEntity>,
  ) {}

  async getReports() {
    try {
      const reports = await this.reportsRepository.find();
      return reports;
    } catch (e) {
      console.log(e);
    }
  }

  async getUserInfo(): Promise<any> {
    const url = `${this.discordApiUrl}/users/1160824008116285521`;
    const headers = {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error('Error fetching user info from Discord');
    }
  }
}
