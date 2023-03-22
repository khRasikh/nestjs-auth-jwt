import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpenseDocument = Expense & Document; //it means the Expense and Document should be same

@Schema()
export class Expense {
  // @Prop({ required: true, default: 1000 })
  // unique_id: number;

  @Prop({ required: true })
  source_full_name: string;

  @Prop({ required: true })
  destination_full_name: string;

  @Prop()
  bank_name: string;

  @Prop()
  transfer_id_no: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  transfer_date: string;

  @Prop({ required: true })
  status: number;

  @Prop()
  additional_info: string;

  @Prop()
  file: [];

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  deletedBy: string;

  @Prop({ default: new Date() })
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  deletedAt: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
