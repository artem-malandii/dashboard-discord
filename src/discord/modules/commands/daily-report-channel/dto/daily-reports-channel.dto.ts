import { ChannelOption } from 'necord';
import { ChannelType, GuildChannel } from 'discord.js';

export class DailyReportsChannelDto {
  @ChannelOption({
    name: 'channel',
    description:
      'Set up channel for daily reports (if empty disable daily reports)',
    channel_types: [ChannelType.GuildText],
  })
  channel: GuildChannel;
}
