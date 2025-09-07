# Contributing to Distributed Counter dApp

Thank you for your interest in contributing to this project! This document outlines the process for contributing to the Distributed Counter dApp.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what behavior you expected to see
- Include screenshots if applicable
- Include your environment details (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain the behavior you expected to see
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` for your feature: `git checkout -b feature-name`
3. Make your changes following the coding standards below
4. Test your changes thoroughly
5. Commit your changes with a clear commit message
6. Push to your branch: `git push origin feature-name`
7. Create a Pull Request

## Development Setup

1. **Prerequisites**
   - Node.js 18+
   - Sui CLI
   - A Sui wallet

2. **Installation**
   ```bash
   npm install
   cd move/counter && sui move build
   ```

3. **Running the app**
   ```bash
   npm run dev
   ```

## Coding Standards

### TypeScript/React

- Use TypeScript for all new code
- Follow existing code style and naming conventions
- Use functional components with hooks
- Add proper TypeScript types for all functions and components
- Use meaningful variable and function names

### Move Smart Contracts

- Follow Move language conventions
- Add comments for complex logic
- Use proper error codes in assertions
- Test functions thoroughly

### Commit Messages

Use clear and meaningful commit messages:
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when applicable

Example:
```
Add counter reset functionality

- Implement set_value function in Move module
- Add reset button to Counter component
- Add owner verification for reset action

Fixes #123
```

## Testing

Before submitting a PR:

1. **Frontend Testing**
   - Test all user interactions
   - Verify wallet connection works
   - Test counter creation, increment, and reset
   - Check responsive design

2. **Smart Contract Testing**
   - Build Move package successfully: `sui move build`
   - Test deployment on testnet
   - Verify all functions work as expected

## Questions?

Feel free to ask questions by opening an issue with the "question" label.
