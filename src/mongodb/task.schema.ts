import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ default: 100 })
  id: number;

  @Prop()
  name: string;

  @Prop()
  status: boolean;

  @Prop({ default: new Date() })
  date: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
