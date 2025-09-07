# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-27

### Added
- Initial release of Distributed Counter dApp
- Counter creation functionality with shared objects
- Counter increment feature accessible to all users
- Counter reset functionality for owners only
- Real-time UI updates after blockchain transactions
- Wallet integration with Sui Wallet support
- Responsive web interface using Radix UI
- Move smart contract with proper access controls
- TypeScript SDK integration for blockchain interactions
- Hash-based routing for direct counter access

### Smart Contract Features
- `Counter` struct with owner, value, and unique ID
- `create()` function for shared counter creation
- `increment()` function for public counter incrementation
- `set_value()` function for owner-only counter reset
- Proper error handling with assertions

### Frontend Features
- React 18 with TypeScript
- Sui dApp Kit integration
- Automatic transaction status handling
- Loading states and error handling
- URL-based counter navigation
- Owner verification for reset actions
