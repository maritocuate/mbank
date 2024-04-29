# MBank App

Simple NextJS app to review balance and generate transactions. Uses Prisma to access to MongoDB.
Zustand to manage the store, NextAuth for the login system and Tailwindcss for the styles.

![screenshot](/public/images/screenshot1.png?raw=true)

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

## Features

- Create accounts.
- Get accounts by ID.
- Make transactions.

## Requirements

Before you get started, ensure that you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)
- MongoDB (or a cloud-based MongoDB service like MongoDB Atlas)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/maritocuate/mbank.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mbank
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## API Endpoints

The API provides the following endpoints:

- POST **/api/accounts**: Create a new bank account. This endpoint expects the following details: name, email, password. The balance field, has a default value of 0.

```bash
{
  "name": "John Doe",
  "email": "jdoe@gmail.com",
  "password": "123456"
}
```

- GET **/accounts/ID/balance**: Gets the bank account balance.
- POST **/transactions**: Gets the bank account balance. Expects accountId, type (deposit or withdrawal), amount.

```bash
{
  "accountId": "65b42d4d87e60a88c61bff74",
  "type": "deposit",
  "amount": "100"
}
```
