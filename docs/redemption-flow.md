# Redemption Flow Implementation

## Overview

When a user holds a Forgotten Fruit NFT they can go through a two-step flow:

1. **Redeem** — call `redeem(tokenId)` on the smart contract, burning the unredeemed state and revealing the pit design.
2. **Order** — fill out a shipping form to receive a physical bottle of wine, fulfilled via Vinoshipper.

The flow is gated by an on-chain redemption window (`redemptionStart` / `redemptionEnd`) and tracks bottle orders in Airtable.

---

## Architecture

### Token States

The `GrapeERC721` contract tracks per-token state via `tokenState(tokenId)`:

| Value | Meaning |
|---|---|
| `0` | Unredeemed |
| `1` | Redeemed (contract call made, pit design revealed) |

### Order Statuses (Vinoshipper → Airtable)

| Status | Meaning |
|---|---|
| `SUCCESS` | Order placed and accepted |
| `PENDING` | Order submitted but under review |
| `CANCELLED` | Order was cancelled |
| `FAILED` | Order failed |

A `PENDING` or `CANCELLED`/`FAILED` order may also carry `orderProblems`. A problem with `type: COMPLIANCE_VIOLATION` means the wine cannot be shipped to the provided state.

---

## Files

### New Files

| File | Purpose |
|---|---|
| `app/api/order/route.ts` | `POST` creates a Vinoshipper order and writes to Airtable; `GET ?tokenId=` looks up the order and polls Vinoshipper if status is PENDING |
| `app/api/order/cancel/route.ts` | `POST { orderNumber }` cancels an order in Vinoshipper — for manual use only, not wired to the UI |
| `src/hooks/useRedemptionWindow.ts` | Reads `redemptionStart` and `redemptionEnd` from the contract; computes `isRedemptionOpen` |
| `src/hooks/useOrderStatus.ts` | Fetches order record for a given `tokenId` from `/api/order` |
| `src/components/OrderWineModal.tsx` | Chakra UI modal with the shipping/DOB form; posts to `/api/order` |
| `src/components/OrderStatusDisplay.tsx` | Renders order status: success, pending, compliance violation, failed/cancelled with retry and contact links |

### Modified Files

| File | Change |
|---|---|
| `src/utils/types.ts` | Added `WineOrderStatus`, `WineOrderProblem`, `WineOrderRecord` |
| `src/lib/airtable.ts` | Added `createOrderRecord`, `findOrderByTokenId`, `updateOrderRecord` for the `FFOrders` table |
| `src/components/TokenActions.tsx` | Full redemption/order logic replacing the presale placeholder text |
| `src/components/NftCard.tsx` | Accepts `isRedemptionOpen` prop and passes it to `TokenActions` |
| `src/components/BottleList.tsx` | Calls `useRedemptionWindow` once and passes `isRedemptionOpen` to each `NftCard` |

---

## Data Flow

### Redemption window check
```
BottleList
  └── useRedemptionWindow()          # one contract read per page load
        └── GrapeERC721.redemptionStart()
        └── GrapeERC721.redemptionEnd()
        └── computes isRedemptionOpen
  └── passes isRedemptionOpen → NftCard → TokenActions
```

### Per-token state
```
NftCard
  └── useTokenStatus(tokenId)        # reads GrapeERC721.tokenState(tokenId)
        └── returns tokenState (0 or 1)
  └── passes tokenState → TokenActions
```

### Order lookup
```
TokenActions (when tokenState === 1)
  └── useOrderStatus(tokenId)
        └── GET /api/order?tokenId=
              └── findOrderByTokenId() → Airtable FFOrders table
              └── if PENDING: poll Vinoshipper GET /orders/{orderNumber}
                    └── if status changed: updateOrderRecord() → Airtable
```

### Order creation
```
OrderWineModal form submit
  └── POST /api/order { tokenId, customer }
        └── POST https://vinoshipper.com/api/v3/p/orders
        └── createOrderRecord() → Airtable FFOrders table
        └── returns { orderNumber, orderStatus, orderProblems }
  └── invalidates orderStatus-{tokenId} query cache
  └── calls onSuccess(record) → TokenActions updates local state
```

---

## Airtable

**Base ID:** `appliHE1mKPAgFx5L` (env: `AIRTABLE_BASE_ID`)  
**Table:** `FFOrders` — table ID `tblMi44LGLjeAfJlr`

| Field | Type | Notes |
|---|---|---|
| `tokenId` | Text | NFT token ID |
| `orderNumber` | Text | Vinoshipper order number |
| `orderStatus` | Text | `SUCCESS`, `PENDING`, `CANCELLED`, `FAILED` |
| `orderProblems` | Long text | JSON-serialised array of `WineOrderProblem` objects |
| `createdAt` | Auto | Airtable record creation time |

---

## UI Logic in TokenActions

```
tokenState === 0 (Unredeemed)
  ├── isRedemptionOpen = false → "Redemption window is not open yet."
  └── isRedemptionOpen = true  → <RedeemPeachButton> (contract tx)

tokenState === 1 (Redeemed)
  ├── orderLoading             → spinner
  ├── order === null           → "Order Your Bottle" button → <OrderWineModal>
  ├── order.status SUCCESS     → order number + date
  ├── order.status PENDING
  │     ├── no compliance issue → order number + "pending" label
  │     └── COMPLIANCE_VIOLATION → "Cannot ship to your state" + retry
  ├── order.status CANCELLED/FAILED
  │     ├── COMPLIANCE_VIOLATION → "Cannot ship to your state" + retry
  │     └── other               → problem description + retry + contact links
  └── (retry opens OrderWineModal for a new submission)
```

Contact links shown on failure: [Telegram](https://t.me/PeachDropNFT) and `Peachdropnft@gmail.com`.

---

## Environment Variables Required

```
AIRTABLE_ACCESS_TOKEN=
AIRTABLE_BASE_ID=appliHE1mKPAgFx5L

VINOSHIPPER_API_KEY=
VINOSHIPPER_API_SECRET=
VINOSHIPPER_API_URL=https://vinoshipper.com/api/v3/p
VINOSHIPPER_PRODUCT_ID=185121
VINOSHIPPER_PRODUCT_ID_TYPE=VS_ID
```

---

## Known TODOs / Go-Live Notes

- **Order number prefix:** `POST /api/order` currently generates `TEST-${Date.now()}` as the order number. Before going live, remove this and let Vinoshipper auto-generate the order number by omitting the `orderNumber` field from the payload.
- **Cancel endpoint:** `POST /api/order/cancel` exists for manual ops use (e.g. an order stuck in PENDING) but is not exposed in the UI.
- **State dropdown:** Only Vinoshipper-eligible states are shown (38 states + DC). Compliance violations still come back from Vinoshipper for restricted states (e.g. CT is listed as restricted); the UI handles them gracefully but there is no pre-check.
- **ZIP / phone validation:** No client-side format validation. Vinoshipper will reject malformed values; errors surface as a submission error message.

---

## Manual Test Plan

Run this once the redemption window is open on the target network.

### Pre-conditions

- [ ] Wallet holds at least one Forgotten Fruit NFT with `tokenState = 0` (unredeemed)
- [ ] `redemptionStart` and `redemptionEnd` are set on the contract and the current time falls within the window
- [ ] All env vars above are set in the deployment environment
- [ ] The `FFOrders` Airtable table is accessible with the configured token

---

### 1. Redemption window gating

| Step | Expected |
|---|---|
| Load `/cellar` with a wallet that holds an unredeemed token | Card shows "Redemption window is not open yet." if current time is outside the window |
| Load `/cellar` when window is open | Card shows the "REDEEM: STEP 1" button |
| Check the Vinoshipper-eligible state list in the order form | 38 states + DC only; MI should not appear |

---

### 2. Redeem (tokenState 0 → 1)

| Step | Expected |
|---|---|
| Click "REDEEM: STEP 1" | Confirmation modal opens |
| Click "TAKE A BITE" | Wallet prompts for transaction signature |
| Sign and confirm tx | Spinner shown while confirming |
| Tx confirmed | "JUICY BITE!" message shown; `tokenState` cache invalidated |
| Close modal and reload card | `tokenState` is now `1`; "Order Your Bottle" button is visible |

---

### 3. Order — successful shipping state (e.g. NY)

| Step | Expected |
|---|---|
| Click "Order Your Bottle" | `OrderWineModal` opens |
| Submit form with valid NY address and 21+ DOB | Loading state shown |
| API responds with `status: SUCCESS` | Modal closes; card shows "Order Placed", order number, and date |
| Reload page | `GET /api/order?tokenId=` hits Airtable; same order info shown |
| Check Airtable FFOrders | New row with `tokenId`, `orderNumber`, `orderStatus: SUCCESS` |
| "Order Your Bottle" button should be gone | Correct — cannot place a second order for a SUCCESS status |

---

### 4. Order — compliance violation state (e.g. CA)

| Step | Expected |
|---|---|
| Submit form with a CA address | API responds; status `PENDING` with `COMPLIANCE_VIOLATION` |
| Card shows | "Cannot ship to your state" message with the problem description |
| Click "Try a Different Address" | `OrderWineModal` reopens |
| Submit with a valid NY address | Order succeeds |

---

### 5. PENDING order polling

| Step | Expected |
|---|---|
| Manually insert a row in FFOrders with `orderStatus: PENDING` for a tokenId and a real order number | — |
| Load `/cellar` for that wallet | `GET /api/order` fires; Vinoshipper is polled for the order number |
| If Vinoshipper returns a new status | Airtable row is updated; card reflects updated status |
| If Vinoshipper still returns PENDING | Card shows "Order Pending" with order number |

---

### 6. Cancel route (ops use)

| Step | Expected |
|---|---|
| Using `curl` or a REST client, `POST /api/order/cancel` with `{ "orderNumber": "<number>" }` | Returns `{ success: true, orderNumber, vinoshipperResponse }` |
| Check Vinoshipper | Order status is CANCELLED |
| Note: Airtable is not automatically updated by cancel — update the row manually or trigger a reload via the GET endpoint | — |
