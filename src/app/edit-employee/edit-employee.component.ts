import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edit',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy {

  employeeForm;
  submitted = false;
  userId;

  private routeSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get f() { return this.employeeForm.controls; }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params.id;
    });

    this.employeeForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      city: ['', Validators.required],
      address_line1: ['', Validators.required],
      address_line2: ['', Validators.required],
      postal_code: ['', Validators.required],
    });

    this.getUserData(this.userId);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  // get user data by userId and add to the form
  getUserData(uid) {
    let userObject;
    this.sharedService.getData().subscribe(res => {
      userObject = res.filter(obj => {
        if (obj.id == uid) {
          return obj;
        }
      });
    });

    this.employeeForm.controls['id'].setValue(userObject[0].id);
    this.employeeForm.controls['name'].setValue(userObject[0].name);
    this.employeeForm.controls['phone'].setValue(userObject[0].phone);
    this.employeeForm.controls['city'].setValue(userObject[0].address.city);
    this.employeeForm.controls['address_line1'].setValue(userObject[0].address.address_line1);
    this.employeeForm.controls['address_line2'].setValue(userObject[0].address.address_line2);
    this.employeeForm.controls['postal_code'].setValue(userObject[0].address.postal_code);
  }

  // Update the user data
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    this.sharedService.updateData(this.employeeForm.value, this.userId);
    this.router.navigate(['/']);
  }

}
