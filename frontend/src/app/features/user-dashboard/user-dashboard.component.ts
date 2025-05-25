import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../core/services/account.service';
import { AuthService } from '../../core/services/auth.service';
import { BankAccountDTO } from '../../core/models/account.model';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  currentUser: User | null = null;
  userAccounts: BankAccountDTO[] = [];
  totalBalance = 0;
  loading = true;
  error = '';

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (user) {
        this.loadUserAccounts();
      }
    });
  }

  loadUserAccounts(): void {
    this.loading = true;

    // For demo purposes, we'll filter accounts by username
    // In a real app, the backend should return only user's accounts
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        // Filter accounts that belong to the current user
        // This is a simplified approach - in production, the backend should handle this
        this.userAccounts = accounts.filter(
          (account) =>
            account.customerDTO.email === this.currentUser?.email ||
            account.customerDTO.name
              .toLowerCase()
              .includes(this.currentUser?.username.toLowerCase() || '')
        );

        this.totalBalance = this.userAccounts.reduce(
          (sum, account) => sum + account.balance,
          0
        );
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load your accounts';
        this.loading = false;
        console.error('Error loading user accounts:', error);
      },
    });
  }

  getAccountTypeIcon(account: BankAccountDTO): string {
    return this.isCurrentAccount(account) ? 'bi-credit-card' : 'bi-piggy-bank';
  }

  getAccountTypeName(account: BankAccountDTO): string {
    return this.isCurrentAccount(account)
      ? 'Current Account'
      : 'Savings Account';
  }

  getAccountTypeClass(account: BankAccountDTO): string {
    return this.isCurrentAccount(account) ? 'text-primary' : 'text-success';
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACTIVATED':
        return 'bg-success';
      case 'SUSPENDED':
        return 'bg-danger';
      case 'CREATED':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  isCurrentAccount(account: BankAccountDTO): boolean {
    return 'overDraft' in account;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  getOverdraftAmount(account: BankAccountDTO): string {
    if (this.isCurrentAccount(account)) {
      const currentAccount = account as any;
      return this.formatCurrency(currentAccount.overDraft || 0);
    }
    return '$0.00';
  }

  getInterestRate(account: BankAccountDTO): string {
    if (!this.isCurrentAccount(account)) {
      const savingsAccount = account as any;
      return (savingsAccount.interestRate || 0).toString();
    }
    return '0';
  }
}
