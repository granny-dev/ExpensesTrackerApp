import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  //private readonly apiUrl = 'https://localhost:7275/api/Transactions';
  private readonly apiUrl = 'https://expensesserver.azurewebsites.net/api/Transactions';

  constructor(private readonly http: HttpClient) {}

  getAll() : Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getById(id: number) : Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  create(transaction: Transaction) : Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  update(id: number, transaction: Transaction) : Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
