import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CheckHealthController } from './check-health.controller';
import { CheckHealthService } from './check-health.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [CheckHealthController],
  providers: [CheckHealthService],
})
export class CheckHealthModule {}
