import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId: any;
  employeeData: Employee;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.getEmployee(this.employeeId);
    this.addEmployeeForm();
  }
  getEmployee(employeeID: number): void {
    this.employeeService.getEmployee(employeeID).subscribe((response: any) => {
      this.editEmployee(response);
      console.log(this.employeeData);
    });
  }
  editEmployee(employee: Employee): void {
    this.employeeForm.patchValue({
      name: employee.name,
      job: employee.job,
      email: employee.email,
      mobile: employee.mobile,
      gender: employee.gender,
      nationalId: employee.nationalId,
      status: employee.status,
    });
  }
  addEmployeeForm(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^01[0-2]{1}[0-9]{8}')],
      ],
      gender: ['', [Validators.required]],
      nationalId: [
        '',
        [
          Validators.required,
          Validators.pattern('[1-9]*'),
          Validators.minLength(14),
          Validators.maxLength(14),
        ],
      ],
      status: [true, [Validators.required]],
    });
  }
  onAddEmployee(): void {
    if (this.employeeId === null) {
      console.log('add');
      this.employeeService
        .addEmployee(this.employeeForm.value)
        .subscribe((response: any) => {
          console.log(response);
          this.toastr.success(
            'New Employee Added',
            this.employeeForm.get('name').value,
            {
              timeOut: 3000,
            }
          );
          this.router.navigate(['/employees']);
        });
    } else {
      console.log('edit');

      this.employeeService
        .editEmployee(this.employeeId, this.employeeForm.value)
        .subscribe((response: any) => {
          console.log(response);
          this.toastr.success(
            'Employee Edited Successfully',
            this.employeeForm.get('name').value,
            {
              timeOut: 3000,
            }
          );
          this.router.navigate(['/employees']);
        });
    }
  }
}
