import { Module } from '@nestjs/common';
import { DiscordModule } from './discord/discord.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), DiscordModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
