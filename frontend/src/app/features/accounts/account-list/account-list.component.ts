import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../../core/services/account.service';
import { BankAccountDTO, CurrentBankAccount, SavingBankAccount } from '../../../core/models/account.model';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: BankAccountDTO[] = [];
  loading = true;
  error = '';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load accounts';
        this.loading = false;
        console.error('Error loading accounts:', error);
      }
    });
  }

  getAccountTypeIcon(account: BankAccountDTO): string {
    return this.isCurrentAccount(account) ? 'bi-credit-card' : 'bi-piggy-bank';
  }

  getAccountTypeName(account: BankAccountDTO): string {
    return this.isCurrentAccount(account) ? 'Current Account' : 'Savings Account';
  }

  getAccountTypeClass(account: BankAccountDTO): string {
    return this.isCurrentAccount(account) ? 'text-primary' : 'text-success';
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACTIVATED': return 'bg-success';
      case 'SUSPENDED': return 'bg-danger';
      case 'CREATED': return 'bg-warning';
      default: return 'bg-secondary';
    }
  }

  isCurrentAccount(account: BankAccountDTO): boolean {
    return 'overDraft' in account;
  }

  isSavingAccount(account: BankAccountDTO): boolean {
    return 'interestRate' in account;
  }

  getCurrentAccount(account: BankAccountDTO): CurrentBankAccount {
    return account as CurrentBankAccount;
  }

  getSavingAccount(account: BankAccountDTO): SavingBankAccount {
    return account as SavingBankAccount;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}
