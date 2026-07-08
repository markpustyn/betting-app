# BlockBet

> A decentralized prediction market built on Ethereum.

## Contributors

| Name | GitHub |
|------|--------|
| Mark Pustynovich | @markpustyn |
| Matthew Farr | @matthewFarr-png |
| Kyle Valdez | @KyleCsus |

# Overview

BlockBet is a decentralized prediction market that allows users to place wagers on real world events without relying on a centralized betting platform.

Using Ethereum smart contracts, every wager, payout, and market outcome is transparently stored on chain, giving users complete visibility into how funds are managed.

## Features

- Ethereum smart contracts
- Wallet based authentication (MetaMask)
- Live prediction markets
- YES / NO betting
- Automatic payout calculation
- Admin market management
- On chain transaction history

---

# Motivation

Traditional betting platforms require users to trust a centralized company to:

- Store funds
- Calculate payouts
- Determine winners
- Manage betting odds

This creates several problems:

- Hidden fees
- Lack of transparency
- Potential conflicts of interest
- Manipulated odds

BlockBet solves these issues by moving market logic onto Ethereum smart contracts, making every transaction publicly verifiable.

## Screenshot

<!-- Insert Motivation Screenshot -->

---

# Technology Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- ethers.js

## Blockchain

- Solidity
- Hardhat
- Ethereum

## Wallet

- MetaMask

---

# System Design

The application follows a decentralized workflow.

```
Admin Creates Market
        │
        ▼
Users Connect Wallet
        │
        ▼
Users Place Bets
        │
        ▼
Smart Contract Records Bets
        │
        ▼
Pools Update Live
        │
        ▼
Admin Resolves Market
        │
        ▼
Users Claim Winnings
```

## System Actors

### Admin

- Creates prediction markets
- Defines event details
- Resolves completed markets

### User

- Connects MetaMask wallet
- Selects an outcome
- Places ETH wager
- Claims rewards

### Smart Contract

Responsible for:

- Storing market data
- Validating wagers
- Locking funds
- Tracking pools
- Calculating payouts

### Frontend

- Displays live market information
- Sends blockchain transactions
- Shows market statistics

### Ethereum Network

- Stores contract state
- Verifies transactions
- Executes contract logic

---

# Smart Contract Functions

## createMarket()

Creates a new prediction market.

Parameters:

- Title
- Option A
- Option B
- Deadline

---

## placeBet()

Allows a user to wager ETH on an outcome.

Functions:

- Records wager
- Updates liquidity pools
- Stores user bet

---

## resolveMarket()

Finalizes the event outcome after the deadline.

Responsible for:

- Closing the market
- Recording the winner
- Preventing further bets

---

## claimWinnings()

Allows winning users to withdraw rewards.

Payout is calculated proportionally based on:

- User contribution
- Winning pool
- Total liquidity

---

## getMarket()

Returns:

- Market title
- Options
- Total pool
- Deadline
- Status

---

## userBets()

Returns a user's wager information for a specific market.

---

## Smart Contract Screenshot

<!-- Insert Solidity Code Screenshot -->

---

# System Architecture


<img width="960" height="540" alt="CSC146 BlockBet Presentation" src="https://github.com/user-attachments/assets/33463386-8f1b-498e-9d39-19e774c8218e" />



The frontend communicates with both:

- Ethereum smart contracts
- Backend API

The backend stores supplemental application data while blockchain state remains on chain.


# Home Page

Users are presented with:

- Live prediction markets
- Wallet connection
- Account access
- Market closing dates

## Screenshot

<img width="960" height="540" alt="CSC146 BlockBet Presentation" src="https://github.com/user-attachments/assets/c01c65b8-b134-4a84-9ae5-28abd2880eff" />


---

# Active Markets

Each market displays:

- Live chart data
- Betting history
- Current liquidity
- Market information
- Trading interface

Users choose:

- YES
- NO

Then confirm the transaction using MetaMask.

## Screenshot

<img width="960" height="540" alt="CSC146 BlockBet Presentation (1)" src="https://github.com/user-attachments/assets/f02e2021-2ee8-4e91-98ee-5d8f5e9e65c8" />


---

# Admin Dashboard

Administrators can:

- Create prediction markets
- Set liquidity
- Set deadlines
- Resolve completed events
- Trigger payouts

## Screenshot

<img width="960" height="540" alt="CSC146 BlockBet Presentation (2)" src="https://github.com/user-attachments/assets/f3eca29b-1fe2-4224-a50c-21e964d55676" />

---

# Security

## Wallet Authentication

Users authenticate using MetaMask instead of usernames and passwords.

Benefits:

- No passwords stored
- No credential database
- Secure wallet signatures

---

## Owner Permissions

Critical functions are protected with Solidity ownership controls.

Only the contract owner can:

- Create markets
- Resolve markets

---

<img width="960" height="257" alt="CSC146 BlockBet Presentation (4)" src="https://github.com/user-attachments/assets/011a85d9-abe0-4b1a-89e2-c15aab485257" />




# Challenges

Several technical challenges were encountered during development.

## Smart Contract Integration

Connecting React to Ethereum required:

- Wallet connection handling
- Transaction signing
- Contract interaction
- Event synchronization

---

## Testing

Testing required multiple MetaMask accounts to simulate:

- Multiple bettors
- Market resolution
- Payout distribution

This process was largely manual.

---

## Frontend Complexity

The interface required separate experiences for:

- Users
- Administrators

Along with real time blockchain updates.

---

## Current Limitations

- Manual market resolution
- Limited automated testing
- Admin controlled market creation
- Multi wallet testing complexity

---

# Future Improvements

Potential future enhancements include:

- Decentralized oracle integration
- Automated market resolution
- DAO governance
- Improved analytics
- Mobile responsive interface
- Advanced charting
- Liquidity provider incentives
- Expanded prediction categories

---

# Key Takeaways

- Fully decentralized prediction market
- Ethereum smart contracts manage wagers and payouts
- Transparent on chain transactions
- Secure wallet based authentication
- Modern web application built with Next.js and Solidity
