import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  AccountDetails,
  AccountOperationDTO,
  BankAccountDTO,
} from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}

  // Private helper method for logging requests
  private logRequest(method: string, url: string, body?: any): void {
    console.log(`[API ${method}] ${url}`, body || '');
  }

  // Bank Account endpoints
  public getBankAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/bank-account/`).pipe(
      catchError((error) => {
        console.error('Error fetching bank accounts:', error);
        return throwError(() => new Error('Failed to fetch bank accounts'));
      })
    );
  }

  public getBankAccountById(id: number): Observable<BankAccountDTO> {
    return this.http
      .get<BankAccountDTO>(`${this.apiUrl}/bank-account/${id}`)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching bank account ${id}:`, error);
          return throwError(() => new Error('Failed to fetch bank account'));
        })
      );
  }

  public createBankAccount(
    bankAccount: BankAccountDTO
  ): Observable<BankAccountDTO> {
    const url = `${this.apiUrl}/bank-account`;
    this.logRequest('POST', url, bankAccount);

    return this.http.post<BankAccountDTO>(url, bankAccount).pipe(
      catchError((error) => {
        console.error('Error creating bank account:', error);
        return throwError(() => new Error('Failed to create bank account'));
      })
    );
  }

  public updateBankAccount(
    bankAccount: BankAccountDTO
  ): Observable<BankAccountDTO> {
    const url = `${this.apiUrl}/bank-account/${bankAccount.id}`;
    this.logRequest('PUT', url, bankAccount);

    return this.http.put<BankAccountDTO>(url, bankAccount).pipe(
      catchError((error) => {
        console.error('Error updating bank account:', error);
        return throwError(() => new Error('Failed to update bank account'));
      })
    );
  }

  public deleteBankAccount(id: number): Observable<any> {
    const url = `${this.apiUrl}/bank-account/${id}`;
    this.logRequest('DELETE', url);

    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error(`Error deleting bank account ${id}:`, error);
        return throwError(() => new Error('Failed to delete bank account'));
      })
    );
  }

  // Account Operations endpoints
  public getAllOperations(): Observable<AccountOperationDTO[]> {
    return this.http
      .get<AccountOperationDTO[]>(`${this.apiUrl}/operations`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching operations:', error);
          return throwError(() => new Error('Failed to fetch operations'));
        })
      );
  }

  public getOperationById(id: number): Observable<AccountOperationDTO> {
    return this.http
      .get<AccountOperationDTO>(`${this.apiUrl}/operations/${id}`)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching operation ${id}:`, error);
          return throwError(() => new Error('Failed to fetch operation'));
        })
      );
  }

  public getOperationsByAccountId(
    accountId: number
  ): Observable<AccountOperationDTO[]> {
    return this.http
      .get<AccountOperationDTO[]>(
        `${this.apiUrl}/operations/account/${accountId}`
      )
      .pipe(
        catchError((error) => {
          console.error(
            `Error fetching operations for account ${accountId}:`,
            error
          );
          return throwError(
            () => new Error('Failed to fetch account operations')
          );
        })
      );
  }

  public createOperation(
    operation: AccountOperationDTO
  ): Observable<AccountOperationDTO> {
    return this.http
      .post<AccountOperationDTO>(`${this.apiUrl}/operations`, operation)
      .pipe(
        catchError((error) => {
          console.error('Error creating operation:', error);
          return throwError(() => new Error('Failed to create operation'));
        })
      );
  }

  public updateOperation(
    operation: AccountOperationDTO
  ): Observable<AccountOperationDTO> {
    return this.http
      .put<AccountOperationDTO>(
        `${this.apiUrl}/operations/${operation.id}`,
        operation
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating operation:', error);
          return throwError(() => new Error('Failed to update operation'));
        })
      );
  }

  public deleteOperation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/operations/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting operation ${id}:`, error);
        return throwError(() => new Error('Failed to delete operation'));
      })
    );
  }

  // Account operations (debit, credit, transfer)
  public debitAccount(
    accountId: number,
    amount: number,
    description?: string
  ): Observable<AccountOperationDTO> {
    const data = { accountId, amount, description };
    return this.http
      .post<AccountOperationDTO>(`${this.apiUrl}/operations/debit`, data)
      .pipe(
        catchError((error) => {
          console.error('Error debiting account:', error);
          return throwError(() => new Error('Failed to debit account'));
        })
      );
  }

  public creditAccount(
    accountId: number,
    amount: number,
    description?: string
  ): Observable<AccountOperationDTO> {
    const data = { accountId, amount, description };
    return this.http
      .post<AccountOperationDTO>(`${this.apiUrl}/operations/credit`, data)
      .pipe(
        catchError((error) => {
          console.error('Error crediting account:', error);
          return throwError(() => new Error('Failed to credit account'));
        })
      );
  }

  public transferBetweenAccounts(
    sourceAccountId: number,
    targetAccountId: number,
    amount: number,
    description?: string
  ): Observable<any> {
    const data = { sourceAccountId, targetAccountId, amount, description };
    return this.http.post<any>(`${this.apiUrl}/operations/transfer`, data).pipe(
      catchError((error) => {
        console.error('Error transferring between accounts:', error);
        return throwError(
          () => new Error('Failed to transfer between accounts')
        );
      })
    );
  }

  // Methods for the original account API
  public getAccount(
    accountId: string,
    page: number,
    size: number
  ): Observable<AccountDetails> {
    return this.http
      .get<AccountDetails>(
        `${environment.backendHost}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`
      )
      .pipe(
        catchError((error) => {
          console.error(`Error fetching account ${accountId}:`, error);
          return throwError(() => new Error('Failed to load account details'));
        })
      );
  }

  public getAllAccounts(): Observable<AccountDetails[]> {
    return this.http
      .get<AccountDetails[]>(`${environment.backendHost}/accounts`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching accounts:', error);
          return throwError(() => new Error('Failed to load accounts'));
        })
      );
  }

  public debit(
    accountId: string,
    amount: number,
    description: string
  ): Observable<any> {
    const data = {
      accountId: accountId,
      amount: amount,
      description: description,
    };
    return this.http
      .post(`${environment.backendHost}/accounts/debit`, data)
      .pipe(
        catchError((error) => {
          console.error('Error debiting account:', error);
          return throwError(() => new Error('Failed to debit account'));
        })
      );
  }

  public credit(
    accountId: string,
    amount: number,
    description: string
  ): Observable<any> {
    const data = {
      accountId: accountId,
      amount: amount,
      description: description,
    };
    return this.http
      .post(`${environment.backendHost}/accounts/credit`, data)
      .pipe(
        catchError((error) => {
          console.error('Error crediting account:', error);
          return throwError(() => new Error('Failed to credit account'));
        })
      );
  }

  public transfer(
    accountSource: string,
    accountDestination: string,
    amount: number,
    description: string
  ): Observable<any> {
    const data = { accountSource, accountDestination, amount, description };
    return this.http
      .post(`${environment.backendHost}/accounts/transfer`, data)
      .pipe(
        catchError((error) => {
          console.error('Error transferring between accounts:', error);
          return throwError(
            () => new Error('Failed to transfer between accounts')
          );
        })
      );
  }

  // Additional methods for editing
  public editAccount(accountId: string, accountData: any): Observable<any> {
    return this.http
      .put(`${environment.backendHost}/accounts/${accountId}`, accountData)
      .pipe(
        catchError((error) => {
          console.error('Error editing account:', error);
          return throwError(
            () =>
              new Error(
                'Failed to edit account: ' +
                  (error.error?.message || error.message)
              )
          );
        })
      );
  }

  public updateAccountOperation(
    operationId: number,
    operationData: any
  ): Observable<any> {
    return this.http
      .put(
        `${environment.backendHost}/operations/${operationId}`,
        operationData
      )
      .pipe(
        catchError((error) => {
          console.error('Error updating operation:', error);
          return throwError(
            () =>
              new Error(
                'Failed to update operation: ' +
                  (error.error?.message || error.message)
              )
          );
        })
      );
  }
}
