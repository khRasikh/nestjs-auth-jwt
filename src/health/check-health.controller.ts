import { Controller, Get } from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class CheckHealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator
  ) {}

  @Get("check")
  @HealthCheck()
  getHelth(): Promise<HealthCheckResult> {
    console.log("Successfully connected to MongoDB");
    return this.health.check([
      () => this.http.pingCheck("docs", "http://localhost:3000/docs"),
    ]);
  }
}
