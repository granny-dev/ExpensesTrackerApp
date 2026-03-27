import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  imports: [CurrencyPipe, DatePipe, CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {
  transactions: Transaction[] = [];
  transactionService = inject(TransactionService);
  cd = inject(ChangeDetectorRef);

  constructor(
    private readonly router: Router) {}

  ngOnInit() {
    this.loadTransactions();
  }

  private loadTransactions() {
    this.transactionService.getAll().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      }
    });
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'Income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'Expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  editTransaction(transaction: Transaction): void {
    if(transaction.id){
      this.router.navigate(['/edit/', transaction.id]);
    }
  }

  deleteTransaction(transaction: Transaction): void {
    if (transaction.id) {
      if(confirm('Are you sure you want to delete this transaction?')) {
        this.transactionService.delete(transaction.id).subscribe({
          next: () => {
              this.loadTransactions();
          },
          error: (err) => {
            console.error('Error deleting transaction:', err);
          }
        });
      }
    }
  }
}
