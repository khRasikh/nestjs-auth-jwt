import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { Expense, ExpenseDocument } from "./expense.schema";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<ExpenseDocument>
  ) {}

  async create(userData: CreateExpenseDto, files: any): Promise<Expense> {
    const {
      source_full_name,
      destination_full_name,
      bank_name,
      transfer_date,
      transfer_id_no,
      amount,
      currency,
      status,
      additional_info,
      createdAt,
      createdBy,
    } = userData;
    const getUid = 999;
    const dataTobeInserted = {
      unique_id: getUid + 1,
      source_full_name,
      destination_full_name,
      bank_name,
      transfer_date,
      transfer_id_no,
      amount,
      currency,
      status,
      additional_info,
      createdAt,
      createdBy,
      file: {
        // data: readFileSync("../../../src/assets/uploads" + files[0].filename), //storing file as base64 to mongodb
        data: files[0], //storing only details of file in mongodb
      },
    };
    const getData = new this.ExpenseModel(dataTobeInserted);
    return getData.save();
  }

  findAll(): Promise<ExpenseDocument[]> {
    return this.ExpenseModel.find().exec();
  }

  totalTx() {
    return this.ExpenseModel.aggregate([
      {
        $group: {
          _id: "$currency",
          amount: {
            $sum: "$amount",
          },
        },
      },
    ]);
  }

  totalDuePayments() {
    return this.ExpenseModel.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
  }

  totalNoOfPeople() {
    const data = this.ExpenseModel.aggregate([
      {
        $group: {
          _id: "$destination_full_name",
          count: { $sum: 1 },
        },
      },
    ]);
    return data;
  }
  async pendingTx() {
    let result = 0;
    const data = this.ExpenseModel.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    (await data).forEach((element) => {
      if (element._id === 0) {
        result = element.count;
      }
    });
    return result;
  }

  async findOne(id: string): Promise<ExpenseDocument[]> {
    return this.ExpenseModel.find({ _id: id }).exec();
  }

  async getEachTx(id: string): Promise<ExpenseDocument[]> {
    const { destination_full_name } = await this.ExpenseModel.findById(
      id
    ).exec();
    const getEachData = this.ExpenseModel.find({
      destination_full_name: destination_full_name,
    }).exec();
    return getEachData;
  }

  async update(
    id: string,
    updatedData: any,
    file: any
  ): Promise<UpdateExpenseDto[]> {
    const {
      unique_id,
      source_full_name,
      destination_full_name,
      bank_name,
      transfer_date,
      transfer_id_no,
      amount,
      currency,
      status,
      additional_info,
      createdAt,
      createdBy,
    } = updatedData;

    const newupdatedData = {
      unique_id,
      source_full_name,
      destination_full_name,
      bank_name,
      transfer_date,
      transfer_id_no,
      amount,
      currency,
      status,
      additional_info,
      createdAt,
      createdBy,
      file: {
        data: file[0],
      },
    };
    return await this.ExpenseModel.findByIdAndUpdate(id, newupdatedData)
      .setOptions({ overwrite: true, new: true })
      .populate("amount")
      .populate("status");
  }

  async updates(
    id: string,
    updatedData: UpdateExpenseDto
  ): Promise<UpdateExpenseDto[]> {
    const myUpdate = await this.ExpenseModel.findByIdAndUpdate(
      id,
      updatedData
    ).setOptions({ overwrite: true, new: true });
    return myUpdate.updateOne();
  }

  async remove(id: string): Promise<ExpenseDocument[]> {
    // return this.ExpenseModel.findByIdAndRemove({ _id: id }).exec();
    return this.ExpenseModel.findByIdAndDelete({ _id: id });
  }
}
