import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../models/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  public getCustomers(): Observable<Array<CustomerDTO>> {
    return this.http.get<Array<CustomerDTO>>(
      environment.backendHost + '/customers'
    );
  }

  public searchCustomers(keyword: string): Observable<Array<CustomerDTO>> {
    return this.http.get<Array<CustomerDTO>>(
      environment.backendHost + '/customers/search?keyword=' + keyword
    );
  }

  public saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(
      environment.backendHost + '/customers',
      customer
    );
  }

  public deleteCustomer(id: number | undefined): Observable<any> {
    return this.http.delete(environment.backendHost + '/customers/' + id);
  }
}
