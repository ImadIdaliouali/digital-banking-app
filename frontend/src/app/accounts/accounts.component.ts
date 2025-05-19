import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../models/account.model';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  accountDetails!: AccountDetails;
  operationFormGroup!: FormGroup; // Correct property name
  errorMessage!: string;
  accountId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private accountService: AccountsService
  ) {}

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['id'];

    // Initialize the accountFormGroup for search
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(''),
    });

    // Initialize the operationFormGroup for operations
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),
    });

    if (this.accountId) {
      this.loadAccount();
    }
  }

  // Add the missing handleSearchAccount method
  handleSearchAccount() {
    const accountId = this.accountFormGroup.value.accountId;
    if (accountId) {
      this.router.navigateByUrl('/accounts/' + accountId);
    }
  }

  loadAccount() {
    if (!this.accountId) return;

    console.log(
      `Loading account ${this.accountId} with page ${this.currentPage} and size ${this.pageSize}`
    );
    this.accountService
      .getAccount(this.accountId, this.currentPage, this.pageSize)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          console.error('Error loading account:', err);
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (accountDetails) => {
          this.accountDetails = accountDetails;
          console.log('Account loaded:', this.accountDetails);
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.loadAccount();
  }

  handleAccountOperation() {
    const operationType = this.operationFormGroup.value.operationType;
    const amount = this.operationFormGroup.value.amount;
    const description = this.operationFormGroup.value.description;
    const accountDestination = this.operationFormGroup.value.accountDestination;

    console.log(`Performing operation ${operationType} with amount ${amount}`);

    if (operationType === 'DEBIT') {
      this.accountService.debit(this.accountId, amount, description).subscribe({
        next: () => {
          this.loadAccount();
          this.operationFormGroup.reset();
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
    } else if (operationType === 'CREDIT') {
      this.accountService
        .credit(this.accountId, amount, description)
        .subscribe({
          next: () => {
            this.loadAccount();
            this.operationFormGroup.reset();
          },
          error: (err) => {
            this.errorMessage = err.message;
          },
        });
    } else if (operationType === 'TRANSFER') {
      this.accountService
        .transfer(this.accountId, accountDestination, amount, description)
        .subscribe({
          next: () => {
            this.loadAccount();
            this.operationFormGroup.reset();
          },
          error: (err) => {
            this.errorMessage = err.message;
          },
        });
    }
  }
}
