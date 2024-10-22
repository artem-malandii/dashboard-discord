import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuildsEntity } from '../../../entities/guilds.entity';
import { DailyReportsChannelService } from './daily-reports-channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuildsEntity])],
  providers: [DailyReportsChannelService],
  exports: [DailyReportsChannelService],
})
export class DailyReportsChannelModule {}
