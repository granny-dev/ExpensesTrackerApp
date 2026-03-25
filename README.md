# Expenses Application

A full-stack expense tracking application with a .NET 9 Web API backend and an Angular frontend. This project allows users to manage and track their income and expenses, categorize transactions, and view summaries.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Overview](#api-overview)
- [Frontend Overview](#frontend-overview)
- [License](#license)

---

## Features
- Add, edit, delete, and list transactions (income/expense)
- Categorize transactions
- View total income, expenses, and net balance
- User authentication (UI present, backend logic to be implemented)
- Responsive Angular UI

## Tech Stack
- **Backend:** ASP.NET Core 9 Web API, Entity Framework Core, SQL Server
- **Frontend:** Angular 21, RxJS

## Project Structure
```
Expenses.sln
Expenses.Api/        # .NET Web API backend
Expenses.Client/     # Angular frontend
```

## Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- SQL Server (local or cloud)

### Backend Setup
1. Navigate to `Expenses.Api`:
   ```bash
   cd Expenses.Api
   ```
2. Update the connection string in `appsettings.json` if needed.
3. Apply migrations and run the API:
   ```bash
   dotnet ef database update
   dotnet run
   ```
   The API will be available at `https://localhost:7275` (default).

### Frontend Setup
1. Navigate to `Expenses.Client`:
   ```bash
   cd Expenses.Client
   npm install
   npm start
   ```
2. Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## API Overview

The backend exposes the following endpoints under `/api/Transactions`:

- `GET /api/Transactions` — List all transactions
- `GET /api/Transactions/{id}` — Get a transaction by ID
- `POST /api/Transactions` — Create a new transaction
- `PUT /api/Transactions/{id}` — Update a transaction
- `DELETE /api/Transactions/{id}` — Delete a transaction

### Transaction Model
- `id`: number
- `type`: string ("Income" or "Expense")
- `category`: string
- `amount`: number
- `createdAt`: Date
- `updatedAt`: Date

---

## Frontend Overview

- Built with Angular 21
- Main features:
  - Transaction list, add/edit form, login/signup UI
  - Uses `TransactionService` to interact with the backend API
  - Routing: `/transactions`, `/add`, `/edit/:id`, `/login`, `/signup`

---

## License

This project is licensed under the MIT License.
