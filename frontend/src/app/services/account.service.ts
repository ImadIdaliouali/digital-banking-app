import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountDetails } from '../models/account.model'; // Fix the import path

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccount(
    accountId: string,
    page: number,
    size: number
  ): Observable<AccountDetails> {
    return this.http
      .get<AccountDetails>(
        environment.backendHost +
          '/accounts/' +
          accountId +
          '/pageOperations?page=' +
          page +
          '&size=' +
          size
      )
      .pipe(
        map((data: any) => {
          // Map the response to match the AccountDetails interface with customer name
          return {
            ...data,
            customer: data.customer || {
              id: data.customerId || '',
              name: data.customerName || '', // Use the name field directly
              email: data.customerEmail || '',
            },
          } as AccountDetails;
        })
      );
  }

  performDebit(
    accountId: string,
    amount: number,
    description: string
  ): Observable<any> {
    let data = { accountId, amount, description };
    return this.http.post(environment.backendHost + '/accounts/debit', data);
  }

  performCredit(
    accountId: string,
    amount: number,
    description: string
  ): Observable<any> {
    let data = { accountId, amount, description };
    return this.http.post(environment.backendHost + '/accounts/credit', data);
  }

  performTransfer(
    accountId: string,
    accountDestination: string,
    amount: number,
    description: string
  ): Observable<any> {
    let data = { accountId, accountDestination, amount, description };
    return this.http.post(environment.backendHost + '/accounts/transfer', data);
  }
}
