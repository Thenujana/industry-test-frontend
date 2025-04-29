import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../models/employee.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  employeeForm: FormGroup;
  isEditing: boolean = false;
  editingId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[A-Za-z ]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employees = data,
      error: (err) => {
        this.errorMessage = 'Failed to load employees';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    const employee: Employee = this.employeeForm.value;

    if (this.isEditing && this.editingId !== null) {
      const updatedEmployee: Employee = { ...employee, id: this.editingId };
      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          this.successMessage = 'Employee updated successfully!';
          this.resetForm();
          this.loadEmployees();
        },
        error: (err) => {
          this.errorMessage = 'Update failed';
          console.error(err);
        }
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          this.successMessage = 'Employee added successfully!';
          this.resetForm();
          this.loadEmployees();
        },
        error: (err) => {
          this.errorMessage = 'Failed to add employee';
          console.error(err);
        }
      });
    }
  }

  editEmployee(emp: Employee): void {
    this.employeeForm.patchValue(emp);
    this.editingId = emp.id!;
    this.isEditing = true;
  }

  resetForm(): void {
    this.employeeForm.reset();
    this.isEditing = false;
    this.editingId = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
  deleteEmployee(id?: number): void {
    if (id === undefined) {
      console.error('Employee ID is undefined.');
      return;
    }
  
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter(emp => emp.id !== id);
          console.log('Employee deleted successfully');
        },
        error: err => {
          console.error('Failed to delete employee', err);
        }
      });
    }
  }
  
  
}
