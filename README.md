# base-simple-market

A retro-styled Base mini app for listing and buying a simple digital product.

## Stack

- Next.js App Router
- TypeScript
- Wagmi
- Viem

## Routes

- /
- /products
- /products/[id]
- /orders
- /owner
- /about

## Notes

- Real contract hooked up for the primary onchain product.
- Additional shelf cards are mock slots so the multi-page market UI stays complete until more contract data is available.
- Builder code and encoded string placeholders are centralized in `lib/wagmi.ts`.
