import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";

export class CreateExpenseDto {
  @ApiProperty()
  @IsNotEmpty()
  unique_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  source_full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  destination_full_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bank_name: string;

  @ApiProperty()
  @IsNotEmpty() 
  transfer_id_no: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  transfer_date: string;

  @ApiProperty({ default: 0 })
  status: number;

  @ApiProperty()
  @IsString()
  additional_info: string;

  @ApiPropertyOptional()
  file: any;

  @ApiProperty()
  @IsString()
  createdBy: string;

  @ApiProperty()
  @IsString()
  updatedBy: string;

  @ApiProperty()
  @IsString()
  deletedBy: string;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  updatedAt: string;

  @ApiProperty()
  @IsString()
  deletedAt: string;
}
