import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';


const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeeComponent,
    children: [
      { path: 'employees-table', component: EmployeesTableComponent },
      { path: 'edit', component: EditEmployeeComponent },
      { path: 'add', component: AddEmployeeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
