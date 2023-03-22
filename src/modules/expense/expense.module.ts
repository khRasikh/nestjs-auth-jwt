import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expense.schema';
import { ExpenseMiddleware } from './validation/expense.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExpenseMiddleware).forRoutes(
      {
        path: '/api/finance',
        method: RequestMethod.GET,
      },
      {
        path: '/api/finance',
        method: RequestMethod.POST,
      },
    );
  }
}
