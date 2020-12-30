import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeesComponent, AddEmployeeComponent],
  imports: [CommonModule, EmployeesRoutingModule, ReactiveFormsModule],
})
export class EmployeesModule {}
