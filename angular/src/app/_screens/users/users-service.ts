import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
  id:any;
  constructor(private http: HttpClient) { 

  }

  setter(id:any){
    this.id=id;
  }
  
  getter(){
      return this.id;
  }
}