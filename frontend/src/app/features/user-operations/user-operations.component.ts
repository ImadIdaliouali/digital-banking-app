import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from '../../core/services/operation.service';
import { AccountService } from '../../core/services/account.service';
import { AuthService } from '../../core/services/auth.service';
import { BankAccountDTO } from '../../core/models/account.model';
import { CreditDTO, DebitDTO, TransferRequestDTO } from '../../core/models/operation.model';
import { User } from '../../core/models/auth.model';

@Component({
  selector: 'app-user-operations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.css']
})
export class UserOperationsComponent implements OnInit {
  transferForm: FormGroup;
  userAccounts: BankAccountDTO[] = [];
  currentUser: User | null = null;
  selectedAccountId = '';
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private accountService: AccountService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.transferForm = this.fb.group({
      accountSource: ['', Validators.required],
      accountDestination: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserAccounts();
      }
    });
    
    // Check for pre-selected account from query params
    this.route.queryParams.subscribe(params => {
      if (params['accountId']) {
        this.selectedAccountId = params['accountId'];
        this.transferForm.patchValue({ accountSource: this.selectedAccountId });
      }
    });
  }

  loadUserAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        // Filter accounts that belong to the current user
        this.userAccounts = accounts.filter(account => 
          account.customerDTO.email === this.currentUser?.email ||
          account.customerDTO.name.toLowerCase().includes(this.currentUser?.username.toLowerCase() || '')
        );
      },
      error: (error) => {
        console.error('Error loading user accounts:', error);
      }
    });
  }

  onTransfer(): void {
    if (this.transferForm.valid) {
      this.loading = true;
      this.clearMessages();

      const transferData: TransferRequestDTO = this.transferForm.value;
      
      // Validate that user is transferring from their own account
      const sourceAccount = this.userAccounts.find(acc => acc.id === transferData.accountSource);
      if (!sourceAccount) {
        this.error = 'You can only transfer from your own accounts';
        this.loading = false;
        return;
      }
      
      this.operationService.transfer(transferData).subscribe({
        next: () => {
          this.success = 'Transfer completed successfully';
          this.transferForm.reset();
          this.loadUserAccounts(); // Refresh account balances
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to process transfer. Check account balance and details.';
          this.loading = false;
          console.error('Error processing transfer:', error);
        }
      });
    }
  }

  private clearMessages(): void {
    this.error = '';
    this.success = '';
  }

  getAccountDisplay(account: BankAccountDTO): string {
    return `${account.id} - ${this.getAccountTypeName(account)} (${this.formatCurrency(account.balance)})`;
  }

  getAccountTypeName(account: BankAccountDTO): string {
    return account.type === 'CurrentAccount' ? 'Current Account' : 'Savings Account';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  canTransferToAccount(account: BankAccountDTO): boolean {
    // Users can transfer to any account (including other users' accounts)
    // but only from their own accounts
    return true;
  }

  isOwnAccount(account: BankAccountDTO): boolean {
    return this.userAccounts.some(userAcc => userAcc.id === account.id);
  }
}
