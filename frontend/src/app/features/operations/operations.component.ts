import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from '../../core/services/operation.service';
import { AccountService } from '../../core/services/account.service';
import { BankAccountDTO } from '../../core/models/account.model';
import { CreditDTO, DebitDTO, TransferRequestDTO } from '../../core/models/operation.model';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {
  creditForm: FormGroup;
  debitForm: FormGroup;
  transferForm: FormGroup;
  accounts: BankAccountDTO[] = [];
  selectedAccountId = '';
  activeTab = 'credit';
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {
    this.creditForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required]
    });

    this.debitForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required]
    });

    this.transferForm = this.fb.group({
      accountSource: ['', Validators.required],
      accountDestination: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
    
    // Check for pre-selected account from query params
    this.route.queryParams.subscribe(params => {
      if (params['accountId']) {
        this.selectedAccountId = params['accountId'];
        this.creditForm.patchValue({ accountId: this.selectedAccountId });
        this.debitForm.patchValue({ accountId: this.selectedAccountId });
        this.transferForm.patchValue({ accountSource: this.selectedAccountId });
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.clearMessages();
  }

  onCredit(): void {
    if (this.creditForm.valid) {
      this.loading = true;
      this.clearMessages();

      const creditData: CreditDTO = this.creditForm.value;
      
      this.operationService.credit(creditData).subscribe({
        next: () => {
          this.success = 'Credit operation completed successfully';
          this.creditForm.reset();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to process credit operation';
          this.loading = false;
          console.error('Error processing credit:', error);
        }
      });
    }
  }

  onDebit(): void {
    if (this.debitForm.valid) {
      this.loading = true;
      this.clearMessages();

      const debitData: DebitDTO = this.debitForm.value;
      
      this.operationService.debit(debitData).subscribe({
        next: () => {
          this.success = 'Debit operation completed successfully';
          this.debitForm.reset();
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to process debit operation. Check account balance.';
          this.loading = false;
          console.error('Error processing debit:', error);
        }
      });
    }
  }

  onTransfer(): void {
    if (this.transferForm.valid) {
      this.loading = true;
      this.clearMessages();

      const transferData: TransferRequestDTO = this.transferForm.value;
      
      this.operationService.transfer(transferData).subscribe({
        next: () => {
          this.success = 'Transfer completed successfully';
          this.transferForm.reset();
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
    return `${account.id} - ${account.customerDTO.name} (${this.formatCurrency(account.balance)})`;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}
