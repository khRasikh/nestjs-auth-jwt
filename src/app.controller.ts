import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { LoginDto } from "./users/dto/user.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RegisterDto } from "./users/dto/register.dto";
import { HasRoles } from "./auth/permission/hasRoles.decorator";
import { Roles } from "./users/user.enum";
import { RolesGuard } from "./auth/permission/roles.guard";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("auth/register")
  async register(@Body() data: RegisterDto) {
    console.log(data);
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req, @Body() data: LoginDto) {
    console.log(data);
    return this.authService.login(req.user);
  }

  @HasRoles(Roles.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("token")
  @Get("auth/profile")
  getProfile(@Request() req) {
    const getData = req.user;
    return getData;
  }
}
