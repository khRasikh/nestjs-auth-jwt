import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";
import { Errors } from "src/users/user-errors.enum";

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message: Errors.TASK_NAME_ERROR,
  })
  name: string;

  @ApiProperty({default: false})
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty({default: new Date()})
  @IsNotEmpty()
  @IsString()
  date: string;
}
