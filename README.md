# Expense Tracker App

## Overview

This is an Expense Tracker application built with React, Firebase DB, and Firebase Auth. The application allows users to track their expenses and provides authentication functionality.
(This project was bootstrapped with Create React App.)

## Features

- **Add Expense:** Users can add their expenses by providing details such as the expense name, amount, and date.
- **Show/Hide Expenses:** Users can view all their expenses in a list format, sorted by date.
- **Authentication:** The application provides secure user authentication using Firebase Auth.

### To-Dos (and fixes)

- Clear all transaction.
- Prevent -ve values as an Expense.
- Filter tags for Transaction List (Expense only, Income only, basic sort).
- A toast message for every trasnaction.

## Potential Feature to add (?)

- Replacing description with "Tags", user will have a bunch of deafault tags, he can create any custom tag also.
- Analytics page to display expenses and income in graphs using tags as parameters.

## Getting Started with Create React App

This project was bootstrapped with Create React App.

## Installation

1. Clone the repository
2. Install the dependencies:
   `npm install`
3. Start the application
   `npm run dev`

## Usage

After starting the application, navigate to `http://localhost:3000` in your web browser. If you're not logged in, you'll be redirected to the login page. After logging in, you can start adding and viewing your expenses.
