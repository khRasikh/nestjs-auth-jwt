// import { PartialType } from '@nestjs/mapped-types';
// import { CreateExpenseDto } from './create-expense.dto';

// export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}

export class UpdateExpenseDto {
    unique_id: string; 
    source_full_name: string;   
    destination_full_name: string; 
    bank_name: string; 
    transfer_id_no: string; 
    amount: number; 
    currency: string; 
    transfer_date: string; 
    status: number; 
    additional_info: string; 
    createdBy: string; 
    updatedBy: string; 
    deletedBy: string;  
    updatedAt: string; 
    deletedAt: string; 
}