export interface CustomerDTO {
  id: number;
  name: string;
  email: string;
}

export type AccountType = 'CurrentAccount' | 'SavingAccount';
export type OperationType = 'DEBIT' | 'CREDIT' | 'TRANSFER';

export interface AccountOperationDTO {
  id: number;
  operationDate: Date;
  date: Date; // Added missing property
  amount: number;
  type: string;
  description: string;
  bankAccountId: string; // Added missing property
}

export interface AccountDetails {
  accountId: string;
  id: string; // Added missing property
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperationDTO[];
  type: string; // Added missing property
  overDraft?: number; // Added missing property
  interestRate?: number; // Added missing property
  createdAt: Date; // Added missing property
  customerDTO: CustomerDTO; // Added missing property
}

export interface BankAccountDTO {
  id: number;
  balance: number;
  createdAt?: Date;
  status?: string;
  customerId?: number;
  type?: string;
}
