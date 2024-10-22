import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { ReportEntity } from '../../../discord/entities/report.entity';
import { APIUser } from 'discord-api-types/v10';

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

      const modifiedReports = await Promise.all(
        reports.map(async (report) => {
          const user = await this.getUserInfo(report.reporterId);
          let avatarLink = '';

          if (user.avatar) {
            const avatarFormat = user.avatar.startsWith('a_') ? 'gif' : 'png';
            avatarLink = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${avatarFormat}`;
          } else {
            avatarLink = `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png`;
          }

          return {
            id: report.id,
            avatarLink: avatarLink,
            reportLink: report.link,
            project: report.project,
            date: report.date,
            report: report.report,
            reporterName: user.global_name ? user.global_name : user.username,
          };
        }),
      );

      return modifiedReports;
    } catch (e) {
      console.log(e);
    }
  }

  private async getUserInfo(userDiscordId: string) {
    const url = `${this.discordApiUrl}/users/${userDiscordId}`;
    const headers = {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get<APIUser>(url, { headers }),
      );
      return response.data;
    } catch (e: any) {
      console.log(e);
      throw new Error('Error fetching user info from Discord');
    }
  }
}
