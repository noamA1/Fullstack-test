import { Operation } from './../models/operation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperationService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:5000/operations/';
  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.URL);
  }

  addNewOperation(newOperation: Operation): Observable<Operation> {
    console.log(newOperation);
    return this.http.post<Operation>(this.URL, newOperation);
  }
  // updateCar(id: String, car: Car): Observable<Car> {
  //   return this.http.put<Car>(`${this.URL}/${id}`, car);
  // }

  // getCar(id: string): Observable<Car> {
  //   return this.http.get<Car>(`${this.URL}/${id}`);
  // }

  // delCar(id: String): Observable<any> {
  //   return this.http.delete<any>(`${this.URL}/${id}`);
  // }
}
