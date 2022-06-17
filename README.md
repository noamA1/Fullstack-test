# Bank App

In this app, you can add transactions to a bank account, such as: depositing cash, withdrawing cash, and taking a loan.
All transactions in the account can be viewed by entering a bank account number, in addition, you can see what the balance of the account is.
All operations can be done by an "employee" or "manager" in the virtual "bank".

Managers can also add new employees or additional managers to the system.
You can also view the "customers" details and add new "customers".

The "employees" are saved in the firebase. Using firebase you can register new "employees", log in to the account and update details.

This project uses a Mongo database, a server-side that communicates with the database is written node js and on the client-side, the user interface, is written in Angular.

The project was done as a task in a full-stack course.

## Installation

To install the libraries included in the project, the following commands must be run:

for the backend:

```bash
    cd backend
    npm install
    npm start
```

for the frontend:

```bash
    cd frontend/client-angular
    npm install
    ng serve --o
```
