import { Routes } from '@angular/router';
import { TransactionList } from './components/transaction-list/transaction-list';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { TransactionForm } from './components/transaction-form/transaction-form';

export const routes: Routes = [
  {path: '', redirectTo: 'transactions', pathMatch: 'full'},
  {path: 'login', component:Login},
  {path: 'signup', component:Signup},
  {path: 'add', component: TransactionForm},
  {path: 'edit/:id', component: TransactionForm},
  {path: 'transactions', component: TransactionList},
  {path: '**', redirectTo: 'transactions'}
];
