import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchKeyword = '';
  loading = true;
  error = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.filteredCustomers = customers;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customers';
        this.loading = false;
        console.error('Error loading customers:', error);
      }
    });
  }

  searchCustomers(): void {
    if (this.searchKeyword.trim()) {
      this.customerService.searchCustomers(this.searchKeyword).subscribe({
        next: (customers) => {
          this.filteredCustomers = customers;
        },
        error: (error) => {
          console.error('Error searching customers:', error);
        }
      });
    } else {
      this.filteredCustomers = this.customers;
    }
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete customer "${customer.name}"?`)) {
      this.customerService.deleteCustomer(customer.id!).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: (error) => {
          this.error = 'Failed to delete customer';
          console.error('Error deleting customer:', error);
        }
      });
    }
  }

  clearSearch(): void {
    this.searchKeyword = '';
    this.filteredCustomers = this.customers;
  }
}
