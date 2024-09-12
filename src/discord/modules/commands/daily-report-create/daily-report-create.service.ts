import { Injectable } from '@nestjs/common';
import {
  Context,
  Ctx,
  Modal,
  ModalContext,
  SlashCommand,
  SlashCommandContext,
} from 'necord';
import { CommandNamesEnum } from '../enums/command-names.enum';
import {
  ActionRowBuilder,
  Client,
  EmbedBuilder,
  ModalBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { GuildsEntity } from '../../../entities/guilds.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportEntity } from '../../../entities/report.entity';

@Injectable()
export class DailyReportCreateService {
  constructor(
    private readonly client: Client,
    @InjectRepository(GuildsEntity)
    private readonly guildRepository: Repository<GuildsEntity>,
    @InjectRepository(ReportEntity)
    private readonly reportsRepository: Repository<ReportEntity>,
  ) {}

  @SlashCommand({
    name: CommandNamesEnum.dailyReportCreate,
    description: 'Opens a window for creating daily report',
    dmPermission: false,
  })
  public async onDailyReportChannel(
    @Context() [interaction]: SlashCommandContext,
  ) {
    const currentDate = dayjs().format('DD.MM');

    return interaction.showModal(
      new ModalBuilder()
        .setTitle('Create Daily Report')
        .setCustomId('daily-report-create')
        .setComponents([
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('date')
              .setLabel('Date')
              .setRequired()
              .setPlaceholder('DD.MM')
              .setValue(currentDate)
              .setMinLength(5)
              .setMaxLength(5)
              .setStyle(TextInputStyle.Short),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('project')
              .setLabel('Project Name')
              .setRequired()
              .setStyle(TextInputStyle.Short),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('report')
              .setLabel('Report')
              .setRequired()
              .setStyle(TextInputStyle.Paragraph),
          ]),
        ]),
    );
  }

  @Modal('daily-report-create')
  public async onModalV3(@Ctx() [interaction]: ModalContext) {
    const guildId = interaction.guildId || '';

    const guild = await this.guildRepository.findOne({
      where: { guildId: guildId },
    });

    if (!guild) {
      return interaction.reply({
        content: 'Your report has not been created. No guild found',
        ephemeral: true,
      });
    }

    if (!guild.dailyReportChannelId) {
      return interaction.reply({
        content:
          'Your report has not been created. The channel for daily reports has not been created',
        ephemeral: true,
      });
    }

    const dailyReportsChannel = this.client.channels.cache.get(
      guild.dailyReportChannelId,
    ) as TextChannel;

    const userAvatar = interaction.user.avatarURL() || null;
    const userId = interaction.user.id;

    const date = interaction.fields.getTextInputValue('date');
    const projectName = interaction.fields.getTextInputValue('project');
    const report = interaction.fields.getTextInputValue('report');

    const embed = new EmbedBuilder()
      .setColor('Green')
      .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setTitle('Daily report')
      .setThumbnail(userAvatar)
      .addFields({
        name: 'Developer',
        value: `<@${userId}>`,
      })
      .addFields({
        name: 'Project',
        value: projectName,
        inline: true,
      })
      .addFields({
        name: 'Date',
        value: date,
        inline: true,
      })
      .addFields({
        name: 'Report',
        value: report,
      })
      .setFooter({ text: 'Keep Coding and take Care (Code&Care)' });

    const dailyReportChannel = await dailyReportsChannel.send({
      embeds: [embed],
    });

    await this.reportsRepository.save({
      date: date,
      link: dailyReportChannel.url,
      report: report,
      reporterId: interaction.user.id,
      project: projectName,
      guild: {
        guildId: guildId,
      },
    });

    return interaction.reply({
      content: 'Your report has been successfully created',
      ephemeral: true,
    });
  }
}
