import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MongoDBModule } from "./mongodb/mongodb.module";
import { CheckHealthModule } from "./health/check-health.module";

@Module({
  imports: [AuthModule, UsersModule, MongoDBModule, CheckHealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
