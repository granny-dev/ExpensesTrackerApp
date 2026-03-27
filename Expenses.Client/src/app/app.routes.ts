import { Routes } from '@angular/router';
import { TransactionList } from './components/transaction-list/transaction-list';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { TransactionForm } from './components/transaction-form/transaction-form';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/transactions', pathMatch: 'full'},
  {path: 'login', component:Login},
  {path: 'signup', component:Signup},
  {path: 'add', component: TransactionForm, canActivate: [authGuard]},
  {path: 'edit/:id', component: TransactionForm, canActivate: [authGuard]},
  {path: 'transactions', component: TransactionList, canActivate: [authGuard]},
  {path: '**', redirectTo: '/transactions'}
];
