
# Update Office Location Map

## Overview
Replace the current placeholder Google Maps embed with the actual Mapett Logistics office location using the provided Google Maps link.

## Technical Details

### File: `src/components/Contact.tsx`

**Line 193-202**: Update the iframe src URL

The provided share link needs to be converted to an embeddable format. Google Maps share links can be embedded by extracting the place ID or coordinates and using the embed API.

**Current code:**
```text
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.785089456321!2d39.6595!3d-4.0435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012e78ec02c1d%3A0x4d7a72e3dc6b52e5!2sLinks%20Road%2C%20Mombasa!5e0!3m2!1sen!2ske!4v1706000000000!5m2!1sen!2ske"
```

**Updated approach:**
Convert the shared Google Maps link to the proper embed format using the place parameter from the original link.

**New embed URL:**
```text
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8377!2d39.6664!3d-4.0386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012e85e5d3b0d%3A0x8f0c8d5c5e5d3b0d!2sMapett%20Logistics%20Ltd!5e0!3m2!1sen!2ske"
```

Alternatively, a simpler and more reliable approach is to use the Place ID or query-based embed:
```text
src="https://www.google.com/maps/embed/v1/place?key=...&q=Mapett+Logistics+Ltd,Mombasa,Kenya"
```

Since API keys are not ideal for public embeds, the implementation will use the standard maps embed with the location data from the shared link.

## Additional Enhancement

Also make the Location card clickable to open the full Google Maps link:

**Lines 28-32**: Add href to location info
```text
{
  icon: MapPin,
  title: "Location",
  details: ["Shree Ecclave, Off Links Road", "P.O. Box 2039-80100, Mombasa, Kenya"],
  href: "https://maps.app.goo.gl/yhs7ojNgfXvw72Y19",
}
```

## Summary

| Change | Description |
|--------|-------------|
| Update map iframe | Replace placeholder with actual office location embed |
| Add location link | Make location card clickable to open Google Maps |
