import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { GatewayIntentBits } from 'discord.js';
import { ConfigModule } from '@nestjs/config';
import { DiscordService } from './discord.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildsEntity } from './entities/guilds.entity';
import { GuildService } from './services/guild.service';
import { DailyReportsChannelModule } from './modules/commands/daily-report-channel/daily-reports-channel.module';
import { DailyReportCreateModule } from './modules/commands/daily-report-create/daily-report-create.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NecordModule.forRoot({
      token: process.env.DISCORD_BOT_TOKEN || '',
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
      ],
      development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID || ''],
    }),
    TypeOrmModule.forFeature([GuildsEntity]),
    DailyReportsChannelModule,
    DailyReportCreateModule,
  ],
  providers: [DiscordService, GuildService],
})
export class DiscordModule {}
