import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url = 'assets/data.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  getData() {
    return this.httpClient.get(this.url);
  }
}
