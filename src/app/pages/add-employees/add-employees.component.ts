import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[A-Za-z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    const newEmployee = this.employeeForm.value;

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.successMessage = 'Employee added successfully!';
        this.errorMessage = '';
        this.employeeForm.reset();
      },
      error: (err) => {
        console.error('Error adding employee:', err);
        this.errorMessage = 'Failed to add employee. Please try again.';
        this.successMessage = '';
      }
    });
  }
}
