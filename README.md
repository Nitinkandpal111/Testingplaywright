# Automation Framework – OrangeHRM & BStackDemo Ecommerce

## Overview

This project is an end-to-end automation framework built with:
Playwright – Browser automation
Cucumber.js – BDD framework for writing feature files
Chai – Assertions
Node.js + NPM – Project runner
The framework automates test cases for two applications:
OrangeHRM – HR management system
BStackDemo – E-commerce website

## Project Structure

📦 automation-framework
┣ 📂 features
┃ ┣ 📜 EcommerceFlow.feature
┃ ┣ 📜 OrangeHRMLoginStep.feature
┣ 📂 step-definitions
┃ ┣ 📜 EcommerceStep.js
┃ ┣ 📜 LoginPageStep.js
┣ 📂 pages
┃ ┣ 📜 LoginPage.js
┃ ┣ 📜 EcommercePage.js
┣ 📂 setup
┃ ┗ 📜 assertions.js
┗ 📜 hooks.js
┣ 📂 reports
┃ ┣ 📜 test-report.html
┃ ┗ 📜 screenshots & videos
┣ 📜 cucumber.js (cucumber config)
┣ 📜 package.json
┣ 📜 README.md
┣ 📜 .gitignore

features/ → Gherkin feature files

step-definitions/ → Step definitions mapping Gherkin steps to Playwright code

pages/ → Page Object Models (POM)

reports/ → Test reports, screenshots, videos

setup/ → Configurations

## Installation

Clone the Repository

-git clone https://github.com/testorgqa-cpu/Playwright
-Install Dependencies
npm install
-Install Playwright Browsers
npx playwright install

## Running Tests

-Run all tests:
npm run test
-Run a specific feature:
npx cucumber-js features/orangehrm.feature
-Run with tags:
npm run test -- --tags "@smoke"

## Scenarios Implemented

✅ OrangeHRM Flow

-Login with valid credentials
-Navigate to Dashboard
-Navigate to the PIM panel
-Create a new employee (random username & password)
-Fill employee details (Nationality, Marital Status, DOB, Gender)
-Search for employee in the Admin panel
-Logout

✅ BStackDemo E-commerce Flow

-Login with demo credentials
-Add an item (iPhone) to the cart
-Proceed to checkout
-Fill in shipping details
-Logout

## Reports

After execution, reports will be available in the reports/ folder.
📄 HTML Report (test-report.html)
📸 Screenshots & 🎥 video recordings of failed tests

## Technologies Used

Playwright – Web automation
Cucumber.js – BDD framework
Chai – Assertions
Node.js – JavaScript runtime
