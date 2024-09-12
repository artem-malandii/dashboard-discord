import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [ReportsModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
