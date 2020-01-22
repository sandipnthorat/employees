import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

  employeeData: any = [];
  filterData;
  filterText;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  // Get all employees data
  getData() {
    this.sharedService.getData().subscribe(res => {
      this.employeeData = res;
      this.filterData = res;
    })
  }

  // Check phone is Digits or char
  checkNumber(num) {
    // tslint:disable-next-line: use-isnan
    if (Number(num)) {
      return num;
    } else {
      return 'NA';
    }
  }

}
