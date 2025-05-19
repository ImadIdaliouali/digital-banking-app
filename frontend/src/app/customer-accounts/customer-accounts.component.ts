import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Update the import path
import { CustomerDTO } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css'],
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: CustomerDTO;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras
      .state as CustomerDTO;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
  }
}
