import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditDTO, DebitDTO, TransferRequestDTO } from '../models/operation.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  credit(creditData: CreditDTO): Observable<CreditDTO> {
    return this.http.post<CreditDTO>(`${this.apiUrl}/credit`, creditData);
  }

  debit(debitData: DebitDTO): Observable<DebitDTO> {
    return this.http.post<DebitDTO>(`${this.apiUrl}/debit`, debitData);
  }

  transfer(transferData: TransferRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transfer`, transferData);
  }
}
