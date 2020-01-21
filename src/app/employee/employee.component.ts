import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'employees',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  employeeData: any = [];

  constructor(

  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
