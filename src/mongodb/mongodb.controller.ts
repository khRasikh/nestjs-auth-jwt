import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/createTask.dto";
import { MongoDBService } from "./mongodb.service";
import { Task } from "./task.schema";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { HasRoles } from "src/auth/permission/hasRoles.decorator";
import { RolesGuard } from "src/auth/permission/roles.guard";
import { Roles } from "src/users/user.enum";

@Controller("task")
export class MongoDBController {
  constructor(private readonly mongoDB: MongoDBService) {}

  @Post()
  async createTask(@Body() createData: CreateTaskDto) {
    return this.mongoDB.create(createData);
  }

  @Get()
  getAll(): Promise<Task[]> {
    return this.mongoDB.findAll();
  }

  @Get(":id")
  getSingle(@Param("id") id: string): Promise<Task[]> {
    return this.mongoDB.findOne(id);
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(":id")
  updateSingle(@Param("id") id: string): Promise<Task[]> {
    return this.mongoDB.updateOne(id);
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Delete(":id")
  deleteSingle(@Param("id") id: string): Promise<Task[]> {
    return this.mongoDB.deleteOne(id);
  }
}
