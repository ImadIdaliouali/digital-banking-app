import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { catchError, Observable, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerDTO } from '../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: CustomerDTO[] = [];
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(''),
    });
    this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword || '';
    this.customerService
      .searchCustomers(kw)
      .pipe(
        catchError((err) => {
          this.errorMessage = err.message;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (data) => {
          this.customers = data;
        },
      });
  }

  handleDeleteCustomer(c: CustomerDTO) {
    let conf = confirm('Are you sure?');
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        this.customers = this.customers.filter((cust) => cust.id != c.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCustomerAccounts(customer: CustomerDTO) {
    this.router.navigateByUrl('/customer-accounts/' + customer.id, {
      state: customer,
    });
  }

  handleUpdateCustomer(customer: CustomerDTO) {
    this.router.navigateByUrl('/update-customer/' + customer.id, {
      state: customer,
    });
  }

  handleNewCustomer() {
    this.router.navigateByUrl('/new-customer');
  }
}
