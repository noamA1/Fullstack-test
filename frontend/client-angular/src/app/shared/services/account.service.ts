import { Observable } from 'rxjs';
import { Account } from '../../models/account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:5000/accounts';

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL);
  }

  addNewClient(newAccount: Account): Observable<Account> {
    return this.http.post<Account>(this.URL, newAccount);
  }

  updateClient(id: String, account: Account): Observable<Account> {
    return this.http.put<Account>(`${this.URL}/${id}`, account);
  }

  deleteClient(accountId: String): Observable<Account> {
    return this.http.delete<Account>(`${this.URL}/${accountId}`);
  }
}
