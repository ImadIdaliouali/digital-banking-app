import { Customer } from './customer.model';

export enum AccountStatus {
  CREATED = 'CREATED',
  ACTIVATED = 'ACTIVATED',
  SUSPENDED = 'SUSPENDED'
}

export interface BankAccount {
  id: string;
  balance: number;
  createdAt: Date;
  status: AccountStatus;
  customerDTO: Customer;
  type: string;
}

export interface CurrentBankAccount extends BankAccount {
  overDraft: number;
}

export interface SavingBankAccount extends BankAccount {
  interestRate: number;
}

export type BankAccountDTO = CurrentBankAccount | SavingBankAccount;
