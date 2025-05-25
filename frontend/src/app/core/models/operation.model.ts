export enum OperationType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}

export interface AccountOperation {
  id: number;
  operationDate: Date;
  amount: number;
  type: OperationType;
  description: string;
}

export interface AccountHistory {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperation[];
}

export interface CreditDTO {
  accountId: string;
  amount: number;
  description: string;
}

export interface DebitDTO {
  accountId: string;
  amount: number;
  description: string;
}

export interface TransferRequestDTO {
  accountSource: string;
  accountDestination: string;
  amount: number;
  description?: string;
}
