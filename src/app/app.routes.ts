import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AddEmployeesComponent } from './pages/add-employees/add-employees.component';
import { UpdateEmployeesComponent } from './pages/update-employees/update-employees.component';

export const routes: Routes = [
    {
      path:"",
      component:DashboardComponent  
    },
    {
        path:"employees",
        component:EmployeesComponent
    },
    {
        path:"add-employee",
        component:AddEmployeesComponent
    },
    
];
