import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerBean } from '../customer-bean';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private http:HttpClient
  constructor( a: HttpClient ) {
     this.http=a;

   }

  public findAllCustomer(): Observable<CustomerBean[]>{
    return this.http.get<CustomerBean[]>("http://localhost:8080/findAllCustomer");
  };

  public addCustomer(customerBean:CustomerBean):Observable<any>{
     return this.http.post("http://localhost:8080/addaCustomer",customerBean,{responseType: 'text'});
  };

public updateCustomer(customerBean:CustomerBean):Observable<any>{
  return this.http.post("http://localhost:8080/updateCustomer",customerBean,{responseType: 'text'})
}

public deleteCustomer(customerNumber:string):Observable<any>{
  return this.http.delete("http://localhost:8080/deleteCustomer",{responseType:'text',headers:{["customerNumber"]:customerNumber}})
}

public deleteAllSelectedCustomer(customerNumberIds:string[]):Observable<any>{
  return this.http.delete("http://localhost:8080/deleteCustomersByIds",{responseType:'text',body:customerNumberIds})
}

}
