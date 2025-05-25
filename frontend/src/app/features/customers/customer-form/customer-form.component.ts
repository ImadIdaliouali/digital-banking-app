import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.customerId = +params['id'];
        this.loadCustomer();
      }
    });
  }

  loadCustomer(): void {
    if (this.customerId) {
      this.loading = true;
      this.customerService.getCustomer(this.customerId).subscribe({
        next: (customer) => {
          this.customerForm.patchValue(customer);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load customer';
          this.loading = false;
          console.error('Error loading customer:', error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.loading = true;
      this.error = '';

      const customerData: Customer = this.customerForm.value;

      const operation = this.isEditMode 
        ? this.customerService.updateCustomer(this.customerId!, customerData)
        : this.customerService.createCustomer(customerData);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/customers']);
        },
        error: (error) => {
          this.error = this.isEditMode ? 'Failed to update customer' : 'Failed to create customer';
          this.loading = false;
          console.error('Error saving customer:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/customers']);
  }

  getFieldError(fieldName: string): string {
    const field = this.customerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }
}
