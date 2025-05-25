import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { AccountService } from '../../core/services/account.service';
import { Customer } from '../../core/models/customer.model';
import { BankAccountDTO } from '../../core/models/account.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customers: Customer[] = [];
  accounts: BankAccountDTO[] = [];
  totalCustomers = 0;
  totalAccounts = 0;
  totalBalance = 0;
  loading = true;

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Load customers
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.totalCustomers = customers.length;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.checkLoadingComplete();
      }
    });

    // Load accounts
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.totalAccounts = accounts.length;
        this.totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
        this.checkLoadingComplete();
      }
    });
  }

  private checkLoadingComplete(): void {
    // Simple check - in a real app you'd want more sophisticated loading state management
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  getAccountTypeIcon(account: BankAccountDTO): string {
    return account.type === 'CurrentAccount' ? 'bi-credit-card' : 'bi-piggy-bank';
  }

  getAccountTypeName(account: BankAccountDTO): string {
    return account.type === 'CurrentAccount' ? 'Current Account' : 'Savings Account';
  }
}
