import { Injectable, Logger } from '@nestjs/common';
import { Context, Opts, SlashCommand, SlashCommandContext } from 'necord';
import { DailyReportsChannelDto } from './dto/daily-reports-channel.dto';
import { Client, PermissionFlagsBits } from 'discord.js';
import { InjectRepository } from '@nestjs/typeorm';
import { GuildsEntity } from '../../../entities/guilds.entity';
import { Repository } from 'typeorm';
import { CommandNamesEnum } from '../enums/command-names.enum';

@Injectable()
export class DailyReportsChannelService {
  private readonly logger = new Logger(DailyReportsChannelService.name);

  constructor(
    private readonly client: Client,
    @InjectRepository(GuildsEntity)
    private readonly guildRepository: Repository<GuildsEntity>,
  ) {}

  @SlashCommand({
    name: CommandNamesEnum.dailyReports,
    description:
      'Set up channel for daily reports (if empty disable daily reports)',
    dmPermission: false,
    defaultMemberPermissions: PermissionFlagsBits.Administrator,
  })
  public async onDailyReportChannel(
    @Context() [interaction]: SlashCommandContext,
    @Opts() dto: DailyReportsChannelDto,
  ) {
    const guildId = interaction.guildId;
    if (!guildId) return;

    const guild = await this.guildRepository.findOne({
      where: { guildId: guildId },
    });

    if (!guild) return;

    if (dto.channel) {
      const updatedGuild = Object.assign(guild, {
        dailyReportChannelId: dto.channel.id,
      });
      await this.guildRepository
        .save(updatedGuild)
        .then(async () => {
          await interaction.reply({
            content: 'Channel for daily reports successfully added',
            ephemeral: true,
          });
        })
        .catch(async (e) => {
          await interaction.reply({
            content: 'Something went wrong while adding daily report channel',
            ephemeral: true,
          });
          this.logger.error(`Set up daily reports ${guild.guildId}: ${e}`);
        });

      return Promise.resolve();
    }

    const updatedGuild = Object.assign(guild, {
      dailyReportChannelId: null,
    });
    await this.guildRepository
      .save(updatedGuild)
      .then(async () => {
        await interaction.reply({
          content: 'Daily report channel successfully removed',
          ephemeral: true,
        });
      })
      .catch(async (e) => {
        await interaction.reply({
          content: 'Something went wrong while removing daily report channel',
          ephemeral: true,
        });
        this.logger.error(`Remove logs ${guild.guildId}: ${e}`);
      });
  }
}
