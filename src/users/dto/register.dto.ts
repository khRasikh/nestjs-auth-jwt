import {
    IsPhoneNumber,
    IsString,
    IsNotEmpty,
    Matches,
  } from "class-validator";
  import { ApiProperty } from "@nestjs/swagger";
  import { Errors } from "../user-errors.enum";
  
  export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z]+$/, {
      message: Errors.FIRST_NAME_ERROR,
    })
    username: string;
  
    @ApiProperty()
    @IsPhoneNumber()
    @Matches(/^[a-zA-Z]+$/, {
      message: Errors.PASSWORD_ERROR,
    })
    password: string;
  }
  