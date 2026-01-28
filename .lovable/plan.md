

# Rename "Marketplace" to "Autoshop"

## Overview
This change will rename all instances of "Marketplace" to "Autoshop" throughout the website, including navigation, section IDs, component names, and display text.

## Changes Summary

| File | What Changes |
|------|--------------|
| `src/components/Marketplace.tsx` | Section heading, section ID, badge text |
| `src/components/Navbar.tsx` | Desktop/mobile menu labels, dropdown state key, anchor links |
| `src/components/Footer.tsx` | Footer column heading, anchor links |
| `src/pages/Products.tsx` | Back link text and URL |
| `src/pages/Cart.tsx` | Browse products link URL |
| `src/pages/Index.tsx` | Component import name |
| `src/components/About.tsx` | Description text mentioning marketplace |
| `src/components/marketplace/ProductShareButtons.tsx` | Share text message |
| `src/components/marketplace/CategoryProductSlider.tsx` | URL reference in share buttons |
| `supabase/functions/customer-chat/index.ts` | Chatbot context text |

## Detailed Changes

### 1. Main Marketplace Component
**File:** `src/components/Marketplace.tsx`

- Rename component from `Marketplace` to `Autoshop`
- Change section ID from `id="marketplace"` to `id="autoshop"`
- Update heading from "Mapett Marketplace" to "Mapett Autoshop"
- Update badge text from "One-Stop Auto Store" to "One-Stop Autoshop"

### 2. Navigation Bar
**File:** `src/components/Navbar.tsx`

- Change dropdown label from "Marketplace" to "Autoshop" (line 175)
- Update dropdown state key from `'marketplace'` to `'autoshop'` (lines 171, 172, 178)
- Update anchor links from `#marketplace` to `#autoshop` (line 188)
- Update mobile menu text from "Marketplace" to "Autoshop" (line 307)

### 3. Footer
**File:** `src/components/Footer.tsx`

- Change column heading from "Marketplace" to "Autoshop" (line 75)
- Update anchor links from `#marketplace` to `#autoshop` (line 79)

### 4. Products Page
**File:** `src/pages/Products.tsx`

- Update back link URL from `/#marketplace` to `/#autoshop` (line 221)

### 5. Cart Page
**File:** `src/pages/Cart.tsx`

- Update browse link URL from `/#marketplace` to `/#autoshop` (line 129)

### 6. Index Page
**File:** `src/pages/Index.tsx`

- Rename import from `Marketplace` to `Autoshop`
- Update component usage in JSX

### 7. About Section
**File:** `src/components/About.tsx`

- Update text from "integrated marketplace" to "integrated autoshop" (line 60)

### 8. Product Share Buttons
**File:** `src/components/marketplace/ProductShareButtons.tsx`

- Update share text from "Mapett Autostore" to "Mapett Autoshop" (line 10)

### 9. Category Product Slider
**File:** `src/components/marketplace/CategoryProductSlider.tsx`

- Update product URL from `/#marketplace` to `/#autoshop` (line 195)

### 10. Customer Chat Function
**File:** `supabase/functions/customer-chat/index.ts`

- Update context text from "Marketplace Products" to "Autoshop Products" (line 25)

## File Rename (Optional)
Consider renaming the component file and folder for consistency:
- `src/components/Marketplace.tsx` → `src/components/Autoshop.tsx`
- `src/components/marketplace/` → `src/components/autoshop/`

Note: I recommend keeping the folder structure as-is to avoid breaking imports and simplify the change.

## No Database Changes Required
This is a frontend text/label change only - no database modifications needed.

