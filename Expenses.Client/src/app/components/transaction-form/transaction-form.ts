import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm implements OnInit {
  transactionForm: FormGroup;
  incomeCategories = ['Salary', 'Investment', 'Gift'];
  expenseCategories = ['Food', 'Transport', 'Entertainment', 'Online'];
  availableCategories:string[] = [];
  editMode: boolean = false;
  transactionId?: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly transactionService: TransactionService) {
    this.transactionForm = this.formBuilder.group({
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.onTypeChange();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
  }

   loadTransaction(id: number): void {
    this.onTypeChange();
    this.transactionService.getById(id).subscribe({
      next: (transaction) => {
        this.transactionForm.patchValue({
          type: transaction.type,
          category: transaction.category,
          amount: transaction.amount,
        });
      },
      error: (err) => {
        console.error('Error loading transaction:', err);
      }
    });
  }

  onTypeChange(): void {
    const type = this.transactionForm.get('type')?.value;
    this.updateAvailableCategories(type);
  }

  updateAvailableCategories(type:string): void {
    this.availableCategories = type === 'Income' ? this.incomeCategories : this.expenseCategories;
    this.transactionForm.patchValue({ category: '' });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;

      if(this.editMode && this.transactionId){
        this.transactionService.update(this.transactionId, transaction).subscribe({
          next: () => {
            console.log('Transaction updated:', transaction);
            this.router.navigate(['/transactions']);
          },
          error: (err) => {
            console.error('Error updating transaction:', err);
          }
        });
      }else{
        this.transactionService.create(transaction).subscribe({
          next: () => {
            console.log('Transaction submitted:', transaction);
            this.router.navigate(['/transactions']);
          },
          error: (err) => {
            console.error('Error submitting transaction:', err);
          }
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/transactions']);
  }
}
