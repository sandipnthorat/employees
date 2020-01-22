import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url = 'assets/data.json';


  data = [
    {
      "id": 1,
      "name": "Jhon",
      "phone": "9999999999",
      "address": {
        "city": "Pune",
        "address_line1": "ABC road",
        "address_line2": "XYZ building",
        "postal_code": "12455"
      }
    },
    {
      "id": 2,
      "name": "Jacob",
      "phone": "AZ99A99PQ9",
      "address": {
        "city": "Pune",
        "address_line1": "PQR road",
        "address_line2": "ABC building",
        "postal_code": "13455"
      }
    },
    {
      "id": 3,
      "name": "Ari",
      "phone": "145458522",
      "address": {
        "city": "Mumbai",
        "address_line1": "ABC road",
        "address_line2": "XYZ building",
        "postal_code": "12455"
      }
    }
  ];

  // Subject Behaviour for data sharing
  private sharedData = new BehaviorSubject(this.data);
  currentData$ = this.sharedData.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  // set the data to the subject behaviour
  setData(data) {
    this.sharedData.next(data);
  }

  // get employee data
  getData() {
    return this.sharedData;
  }

  // add new employee
  addData(d) {
    let tempData = this.data;
    tempData.push({
      id: parseInt(d.id, 10),
      name: d.name,
      phone: d.phone,
      address: {
        city: d.city,
        address_line1: d.address_line1,
        address_line2: d.address_line2,
        postal_code: d.postal_code
      }
    });

    this.setData(tempData);
  }

  // update employee data
  updateData(data, id) {
    this.data.forEach(obj => {
      if (obj.id == id) {
        obj.id = data.id;
        obj.name = data.name;
        obj.phone = data.phone;
        obj.address.city = data.city;
        obj.address.address_line1 = data.address_line1;
        obj.address.address_line2 = data.address_line2;
        obj.address.postal_code = data.postal_code;
      }
    });
    this.setData(this.data);
  }
}
