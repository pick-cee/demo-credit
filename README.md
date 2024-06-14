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

### API Endpoints

-   POST /signup: Create a new user account.
-   POST /fund: Fund a user account.
-   POST /transfer: Transfer funds to another user.
-   POST /withdraw: Withdraw funds from a user account.

### Faux Token-Based Authentication

A simple middleware to simulate token-based authentication.
