import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './../models/employee';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  // tslint:disable-next-line:variable-name
  private _refreshNeeded$ = new Subject();
  // tslint:disable-next-line:typedef
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/employees`);
  }
  deleteEmployee(id: number): Observable<Employee[]> {
    return this.http
      .delete<Employee[]>(`${environment.baseUrl}/employees/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
  addEmployee(data: Employee): Observable<Employee[]> {
    return this.http
      .post<Employee[]>(`${environment.baseUrl}/employees`, data)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
  editEmployee(id: number, data: Employee): Observable<Employee[]> {
    return this.http
      .put<Employee[]>(`${environment.baseUrl}/employees/${id}`, data)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
  getEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.baseUrl}/employees/${id}`);
  }
}
