import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  isLoading = true;
  showModal = false;
  date: Date = new Date();
  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;
  order = 'id';
  reverse = false;
  sortedCollection: any[];
  p = 1;
  selectedAll: any;
  selectedNames: any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private orderPipe: OrderPipe
  ) {
    this.sortedCollection = orderPipe.transform(this.employees, 'id');
    console.log(this.sortedCollection);
  }

  ngOnInit(): void {
    this.employeeService.refreshNeeded$.subscribe(() => {
      this.getAllEmployees();
    });
    this.getAllEmployees();
  }
  getAllEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployees().subscribe((response: any) => {
      console.log(response);
      this.employees = response;
      this.isLoading = false;
    });
  }

  onDeleteEmployee(id: number): void {
    if (confirm('are you sure?')) {
      this.employeeService.deleteEmployee(id).subscribe((response: any) => {
        console.log(response.id);
      });
    }
  }
  onEditEmployee(id: number): void {
    this.router.navigate(['./employees/edit', id]);
  }

  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  selectAll(): void {
    this.selectedAll = !this.selectedAll;

    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].selected = this.selectedAll;
    }
  }
}
