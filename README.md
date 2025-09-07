# Distributed Counter dApp

A full-stack decentralized application built on the Sui blockchain that allows users to create, increment, and reset counter objects. This project demonstrates the complete end-to-end flow of building a Sui Move module and connecting it to a React frontend.

## Features

- **Create Counters**: Users can create new counter objects that are shared globally
- **Increment Counters**: Anyone can increment any counter
- **Reset Counters**: Only the owner can reset their counter to zero
- **Real-time Updates**: UI updates automatically after transactions

## Tech Stack

### Smart Contracts
- **Sui Move**: Smart contract language for the Sui blockchain
- **Sui Framework**: Built-in Sui libraries for object management and transfers

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **@mysten/dapp-kit**: Sui-specific React components and hooks
- **@mysten/sui**: Sui TypeScript SDK
- **@radix-ui/themes**: Modern UI components
- **@tanstack/react-query**: Data fetching and caching

## Project Structure

```
counter/
├── move/counter/           # Smart contract code
│   ├── Move.toml          # Package manifest
│   └── sources/
│       └── counter.move   # Main contract module
├── src/                   # Frontend React code
│   ├── App.tsx           # Main app component with routing
│   ├── Counter.tsx       # Counter display and interaction component
│   ├── CreateCounter.tsx # Counter creation component
│   ├── constants.ts      # Package ID constants
│   ├── networkConfig.ts  # Network configuration
│   └── main.tsx         # React app entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Sui CLI](https://docs.sui.io/guides/developer/getting-started/sui-install) installed
- A Sui wallet (like [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil))
- SUI tokens for testnet (get them from the [faucet](https://faucet.sui.io/))

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd counter
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up Sui CLI** (if not already done)
   ```bash
   sui client
   # Follow the prompts to set up your wallet
   ```

4. **Switch to testnet**
   ```bash
   sui client new-env --alias testnet --rpc https://fullnode.testnet.sui.io:443
   sui client switch --env testnet
   ```

5. **Get testnet SUI tokens**
   Visit [https://faucet.sui.io/] and request tokens for your wallet address

## Smart Contract Deployment

1. **Build the Move package**
   ```bash
   cd move/counter
   sui move build
   ```

2. **Deploy to testnet**
   ```bash
   sui client publish --gas-budget 20000000
   ```

3. **Update the package ID**
   Copy the `PackageID` from the deployment output and update it in `src/constants.ts`:
   ```typescript
   export const COUNTER_PACKAGE_ID = "YOUR_PACKAGE_ID_HERE";
   ```

## Running the Frontend

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173`

3. **Connect your wallet**
   Click the "Connect Wallet" button and select your Sui wallet

4. **Create and interact with counters**
   - Click "Create Counter" to create a new counter
   - Use the "Increment" button to increase the counter value
   - Use the "Reset" button (only visible to owner) to reset to zero

## Smart Contract Overview

The counter module defines:

### Struct
- `Counter`: Has `key` ability, contains `id`, `owner`, and `value` fields

### Functions
- `create()`: Creates a new shared Counter object
- `increment()`: Increases counter value by 1 (anyone can call)
- `set_value()`: Sets counter to a specific value (owner only)
- `value()`: Returns the current counter value
- `owner()`: Returns the counter owner address

## Frontend Components

### App.tsx
- Main application component with routing logic
- Handles URL hash-based navigation to specific counters
- Manages wallet connection state

### CreateCounter.tsx
- Button component for creating new counters
- Handles transaction creation and execution
- Extracts created counter ID from transaction results

### Counter.tsx
- Displays counter information and controls
- Fetches counter data using Sui client queries
- Provides increment and reset functionality
- Shows reset button only to counter owner

## Key Concepts Demonstrated

### Shared Objects
Counters are created as shared objects using `transfer::share_object()`, making them globally accessible and allowing multiple users to interact with the same counter.

### Programmable Transaction Blocks (PTBs)
All blockchain interactions use PTBs to call Move functions, providing composability and gas efficiency.

### Access Control
The reset functionality demonstrates owner-based access control using `assert!(counter.owner == ctx.sender(), 0)`.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview

# Build Move contracts
cd move/counter && sui move build

# Deploy contracts
cd move/counter && sui client publish --gas-budget 20000000
```

## Troubleshooting

### Common Issues

1. **"DependentPackageNotFound" error**
   - Make sure you're connected to testnet
   - Verify your package ID is correct in `constants.ts`
   - Ensure the contract was deployed successfully

2. **Transaction not found**
   - Wait a few seconds and try again (network propagation delay)
   - Check your network connection
   - Verify you're on the correct network

3. **Wallet connection issues**
   - Install a Sui-compatible wallet
   - Make sure the wallet is connected to testnet
   - Refresh the page and try reconnecting

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [Sui Documentation](https://docs.sui.io/)
- [Sui Move Book](https://move-book.com/)
- [Sui TypeScript SDK](https://sdk.mystenlabs.com/typescript)
- [dApp Kit Documentation](https://sdk.mystenlabs.com/dapp-kit)

## Acknowledgments

- Built following the official Sui distributed counter tutorial
- Uses Sui's dApp Kit for seamless blockchain integration
- UI components powered by Radix UI
