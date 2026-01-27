
# Fix Logo Height Overflow

## Problem
The current logo image (`src/assets/mapett-logo.png`) has excessive white space/padding above and below the actual logo content (MP monogram and "MAPETT LOGISTICS" text). This is causing the logo to overflow beyond the navbar (which is 80px tall) and cover the top contact bar.

## Solution
Regenerate the logo image with tight cropping to remove all excess white space while maintaining the actual logo size. The logo content itself will remain the same size - only the empty canvas area around it will be removed.

## Technical Changes

### 1. Regenerate Logo Image
**File:** `src/assets/mapett-logo.png`
- Crop out all excess white space above and below the logo
- Keep the MP monogram and "MAPETT LOGISTICS" text at their current size
- Create a tightly-cropped image that fits exactly around the logo content
- Maintain transparent background

### 2. Adjust Navbar Container (Optional)
**File:** `src/components/Navbar.tsx`
- Current logo class: `h-28` (112px height)
- Current navbar height: `h-20` (80px)
- After cropping, may need minor adjustment to ensure proper fit

## Expected Result
- Logo will fit within the navbar without overlapping the top contact bar
- The actual MP monogram and company name will remain the same visual size
- Clean, professional appearance with proper spacing
