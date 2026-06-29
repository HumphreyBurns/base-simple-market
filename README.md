# base-simple-market

A retro-styled Base mini app for listing and buying a simple digital product.

Repository: [https://github.com/HumphreyBurns/base-simple-market.git](https://github.com/HumphreyBurns/base-simple-market.git)

## Overview

`base-simple-market` is a small marketplace-style application built for Base.

It presents a simple digital product in a retro interface, with supporting pages for product browsing, product details, orders, owner actions, and project information.

The app is designed around a primary onchain product while keeping the broader market interface ready for additional products as more contract data becomes available.

## Features

- Retro-styled market interface
- Product listing page
- Product detail route with dynamic product IDs
- Orders page
- Owner page
- About page
- Primary onchain product integration
- Mock shelf cards used as placeholders for future product slots
- Centralized builder code and encoded string placeholders in `lib/wagmi.ts`

## Tech Stack

- Next.js App Router
- TypeScript
- Wagmi
- Viem

## Routes

The application includes the following routes:

- `/`
- `/products`
- `/products/[id]`
- `/orders`
- `/owner`
- `/about`

## Project Structure

The exact folder structure may evolve, but the main application follows the Next.js App Router model.

Important project areas include:

- `app/` for application routes and pages
- `lib/wagmi.ts` for Wagmi-related configuration, builder code, and encoded string placeholders
- Product pages for browsing and viewing marketplace items
- Owner and order pages for market-related workflows

## Setup

Clone the repository:

```bash
git clone https://github.com/HumphreyBurns/base-simple-market.git
```

Move into the project directory:

```bash
cd base-simple-market
```

Install dependencies:

```bash
npm install
```

If your local setup requires environment variables, create a local environment file before running the app.

For example:

```bash
cp .env.example .env.local
```

If no example environment file is present, review the codebase for required runtime configuration before starting development.

## Development

Start the development server:

```bash
npm run dev
```

Then open the local development URL shown in your terminal.

For a typical Next.js project, this is usually:

```text
http://localhost:3000
```

## Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Usage

Use the home page to enter the market experience.

Browse available product cards from the products page:

```text
/products
```

Open a specific product page using its product ID:

```text
/products/[id]
```

Review order-related views at:

```text
/orders
```

Access owner-related functionality at:

```text
/owner
```

Read project information at:

```text
/about
```

## Onchain Product Notes

The primary product is connected to a real contract.

Additional shelf cards are mock slots. These placeholders keep the multi-page market UI complete until more contract-backed product data is available.

Builder code and encoded string placeholders are centralized in:
