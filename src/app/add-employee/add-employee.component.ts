import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm;
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: ['', Validators.required],
      address_line1: ['', Validators.required],
      address_line2: ['', Validators.required],
      postal_code: ['', Validators.required],
    });

    this.sharedService.getData().subscribe(res => {
      console.log(res);
      const id = res.length + 1;
      this.employeeForm.controls['id'].setValue(id);
      // console.log(res.length);
    });
  }

  get f() { return this.employeeForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    this.sharedService.addData(this.employeeForm.value);
    this.router.navigate(['/']);
  }

}
