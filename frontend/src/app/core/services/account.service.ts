import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccountDTO } from '../models/account.model';
import { AccountHistory, AccountOperation } from '../models/operation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(this.apiUrl);
  }

  getAccount(accountId: string): Observable<BankAccountDTO> {
    return this.http.get<BankAccountDTO>(`${this.apiUrl}/${accountId}`);
  }

  getAccountOperations(accountId: string): Observable<AccountOperation[]> {
    return this.http.get<AccountOperation[]>(`${this.apiUrl}/${accountId}/operations`);
  }

  getAccountHistory(accountId: string, page: number = 0, size: number = 5): Observable<AccountHistory> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<AccountHistory>(`${this.apiUrl}/${accountId}/pageOperations`, { params });
  }

  getCustomerAccounts(customerId: number): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${environment.apiUrl}/customers/${customerId}/accounts`);
  }
}
