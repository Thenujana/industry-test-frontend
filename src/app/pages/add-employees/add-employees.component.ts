import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [EmployeeService],
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent {
  employeeForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[A-Za-z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    const newEmployee: Employee = this.employeeForm.value;

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.successMessage = 'Employee added successfully!';
        this.employeeForm.reset();
        setTimeout(() => this.router.navigate(['/employees']), 1000); // redirect after success
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        this.errorMessage = 'Failed to add employee. Please try again.';
      }
    });
  }
}
