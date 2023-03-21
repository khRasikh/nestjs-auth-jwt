import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBController } from './mongodb.controller';
import { MongoDBService } from './mongodb.service';
import { Task, TaskSchema } from './task.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGODB_URL}`),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [MongoDBController],
  providers: [MongoDBService],
})
export class MongoDBModule {}
