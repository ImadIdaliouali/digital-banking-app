import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { AccountOperationDTO } from '../models/account.model';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css'],
})
export class OperationsComponent implements OnInit {
  operations!: Observable<AccountOperationDTO[]>;
  errorMessage!: string;
  operationFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.operationFormGroup = this.fb.group({
      accountId: this.fb.control('', [Validators.required]),
      amount: this.fb.control(0, [Validators.required, Validators.min(1)]),
      description: this.fb.control(''),
      operationType: this.fb.control('CREDIT', [Validators.required]),
    });
    this.handleGetAllOperations();
  }

  handleGetAllOperations() {
    this.operations = this.accountsService.getAllOperations().pipe(
      catchError((err) => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleGetOperationsByAccountId() {
    const accountId = this.operationFormGroup.value.accountId;
    if (accountId) {
      this.operations = this.accountsService
        .getOperationsByAccountId(accountId)
        .pipe(
          catchError((err) => {
            this.errorMessage = err.message;
            return throwError(err);
          })
        );
    } else {
      this.handleGetAllOperations();
    }
  }

  handleSubmitOperation() {
    const accountId = this.operationFormGroup.value.accountId;
    const amount = this.operationFormGroup.value.amount;
    const description = this.operationFormGroup.value.description;
    const operationType = this.operationFormGroup.value.operationType;

    if (operationType === 'CREDIT') {
      this.accountsService
        .creditAccount(accountId, amount, description)
        .subscribe({
          next: (data) => {
            alert('Success Credit');
            this.operationFormGroup.patchValue({ amount: 0, description: '' });
            this.handleGetOperationsByAccountId();
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = err.message;
          },
        });
    } else if (operationType === 'DEBIT') {
      this.accountsService
        .debitAccount(accountId, amount, description)
        .subscribe({
          next: (data) => {
            alert('Success Debit');
            this.operationFormGroup.patchValue({ amount: 0, description: '' });
            this.handleGetOperationsByAccountId();
          },
          error: (err) => {
            console.log(err);
            this.errorMessage = err.message;
          },
        });
    }
  }
}
