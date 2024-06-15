# Wallet Service MVP

## Introduction

This document outlines the design and implementation of a wallet service MVP (Minimum Viable Product) for the Demo Credit mobile lending app. The wallet service allows users to create accounts, fund their accounts, transfer funds to other users, and withdraw funds from their accounts. Additionally, users on the Lendsqr Adjutor Karma blacklist will not be onboarded.

### Tech Stack

1. NodeJS (LTS version)
2. TypeScript
3. KnexJS ORM
4. MySQL database

### Features

1. User account creation
2. Account funding
3. Transfer of funds between users
4. Withdrawal of funds
5. Blacklist check with Lendsqr Adjutor API

### Database Schema

### ER Diagram

[![](https://mermaid.ink/img/pako:eNqtUstqwzAQ_BWhc_IDupk2hdLghtilF0PYWhtbRA8jrSjB8b9XqVOSNIZCyZ52Z_Ywszs9r51ELnhl0T8qaDyYyrJUb8ViXbB-HI6lLDEl2erlDAXyyjZsG7XOweANgQaUvkE7COHTeXkmJBCSMshqj6mVG6AJMnbyihwqOzbv2XK5KP8Se4RiQL9J-NMFLrFWBjT7AA22xrupKtdZXmQP5fNr_l9paKNhtO_wVi0YFy39Wg0EFMPdHIwROBzmc9f_HFmwFsIEfelWMAM7DNfPmdyrnSVQNvAZN-hTWmSK4vetKk4tpkhxkVoJfleliA5pDyK5Ym9rLshHnHHvYtNysQUd0jR6OQX5hA5fkmDhUA?type=png)](https://mermaid.live/edit#pako:eNqtUstqwzAQ_BWhc_IDupk2hdLghtilF0PYWhtbRA8jrSjB8b9XqVOSNIZCyZ52Z_Ywszs9r51ELnhl0T8qaDyYyrJUb8ViXbB-HI6lLDEl2erlDAXyyjZsG7XOweANgQaUvkE7COHTeXkmJBCSMshqj6mVG6AJMnbyihwqOzbv2XK5KP8Se4RiQL9J-NMFLrFWBjT7AA22xrupKtdZXmQP5fNr_l9paKNhtO_wVi0YFy39Wg0EFMPdHIwROBzmc9f_HFmwFsIEfelWMAM7DNfPmdyrnSVQNvAZN-hTWmSK4vetKk4tpkhxkVoJfleliA5pDyK5Ym9rLshHnHHvYtNysQUd0jR6OQX5hA5fkmDhUA)

### Getting Started

Follow these instruction to get the project up and running on your local machine for development and testing purposes.

#### Prerequisites

-   [Node.js](https://nodejs.org/en/) installed.
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager.

#### Installation

1. Clone the repository: <br>
   <code>git clone [git@github.com:pick-cee/demo-credit.git](git@github.com:pick-cee/demo-credit.git)</code>
2. Navigate to the project directory: <br>
   `cd vzy-assessment`
3. Install dependencies: <br>
   <code> npm install</code>
   <br> or <br>
   <code>yarn</code>

4. Configure environment variables:
    - Create a `.env` file in the root directory and add the following or you can just simply follow the `.env.sample` file provided:
    ```json
    PORT=
    DATABASE_HOST=
    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_NAME=
    APP_ID=
    SECRET_KEY=
    JWT_ACCESS_KEY=
    JWT_EXPIRES=
    ```
5. Run database migration:
   <code>npx run migrate:latest</code>.

6. Run the development server: <br>
   <code> npm run dev</code>
   <br> or <br>
   <code>yarn start</code>
   <br>

The application will be available at `http://localhost:{PORT}`.
<br>

### API Endpoints

-   Create a new user account and a wallet upon successful signup.
-   Log in to account
-   Fund a user account.
-   Transfer funds to another user.
-   Withdraw funds from a user account.

### Bearer Token-Based Authentication

A simple middleware to simulate token-based authentication.

### Postman Documentation

A well detailed guide on how to interact with the API endpoints. [Postman docs]()

### Full documentation

You can find the full documentation, containing reasons behind the tech stack and other assumptions. [Full docs]()

### Author

Akinloluwa Olumuyide - [Profile](https://github.com/pick-cee)

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/pick-cee/demo-credit/blob/master/LICENSE) file for details
