import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';

export const routes: Routes = [
    {
      path:"",
      component:DashboardComponent  
    },
    {
        path:"employees",
        component:EmployeesComponent
    }
];
