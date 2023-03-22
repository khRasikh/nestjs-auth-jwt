import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from "@nestjs/common";
import { ExpenseService } from "./expense.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { HasRoles } from "src/auth/permission/hasRoles.decorator";
import { RolesGuard } from "src/auth/permission/roles.guard";
import { Roles } from "src/users/user.enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions('read:data')
  @Post('add')
  @UseInterceptors(
    FilesInterceptor("file", 20, {
      storage: diskStorage({
        destination: "./../src/assets/uploads",
        filename: function (req, file, callback) {
          const ext = extname(file.originalname);
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  async create(
    @UploadedFiles() files: any,
    @Body() createExpenseDto: CreateExpenseDto
  ) {
    let response = [];
    if (files === undefined) {
      response = [0];
    } else {
      files.forEach((i) => {
        const fileReponse = {
          filename: i.filename,
          fileoriginalname: i.originalname,
          size: i.size,
          path: i.path,
          mimetype: i.mimetype,
        };
        response.push(fileReponse);
      });
    }
    return this.expenseService.create(createExpenseDto, response);
  }

  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Permissions('read:data')
  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get("transactions")
  totalTransaction() {
    return this.expenseService.totalTx();
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get("paymentcount")
  totalDuePayments() {
    return this.expenseService.totalDuePayments();
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get("people")
  allPeople() {
    return this.expenseService.totalNoOfPeople();
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get("pending")
  pendingTransactions() {
    return this.expenseService.pendingTx();
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.expenseService.findOne(id);
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get("each/:id")
  findOneX(@Param("id") id: string) {
    return this.expenseService.getEachTx(id);
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto, "file");
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Put(":id")
  @UseInterceptors(
    FilesInterceptor("file", 20, {
      storage: diskStorage({
        destination: "./../src/assets/uploads",
        filename: function (req, file, callback) {
          const ext = extname(file.originalname);
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  async updates(
    @Param("id") id: string,
    @UploadedFiles() files: any,
    @Body() UpdateExpenseDto: any
  ) {
    const response = [];
    files.forEach((i) => {
      const fileReponse = {
        filename: i.filename,
        fileoriginalname: i.originalname,
        size: i.size,
        path: i.path,
        mimetype: i.mimetype,
      };
      response.push(fileReponse);
    });

    return this.expenseService.update(id, UpdateExpenseDto, response);
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.expenseService.remove(id);
  }
}
