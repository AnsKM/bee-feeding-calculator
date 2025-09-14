# Changelog - Seasonal Feeding Calculator & Schedule

## Version 1.0.2 - 2025-09-14

### Bug Fixes
✅ **Fixed Horizontally Scrollable Navigation on Mobile**
- Replaced horizontal scroll with 2x2 grid layout on screens < 576px
- All 4 navigation tabs now visible without scrolling
- Removed overflow-x: auto that caused poor UX
- Maintained large 48px touch targets for accessibility
- Added vertical stacking for very small screens (<375px)
- Improved active state visibility with enhanced box-shadow
- Centered navigation on larger screens
- Special landscape orientation handling

---

## Version 1.0.1 - 2025-09-14

### Bug Fixes
✅ **Fixed Small Dropdown Text on Mobile**
- Increased select element font-size from 16px to 18px for better readability
- Added explicit font-family inheritance to ensure consistent typography
- Implemented custom dropdown arrow with SVG for consistent cross-platform styling
- Added iOS-specific webkit appearance fixes to prevent native styling issues
- Increased minimum touch target height from 44px to 48px for better accessibility
- Enhanced padding (12px vertical, 16px horizontal) for improved touch interaction
- Added responsive font sizing: 17px for screens < 375px, 18px for standard mobile
- Fixed iOS text rendering issues with webkit font smoothing
- Ensured proper text color inheritance and overflow handling

### Technical Details
- iOS zoom prevention maintained while improving readability
- Custom dropdown arrow uses inline SVG with brand colors
- Webkit appearance reset ensures consistent styling across iOS versions
- Touch targets now exceed WCAG 2.1 AAA standards (48x48px minimum)

---

## Version 1.0.0 - 2025-09-14

### Initial Release
Created comprehensive feeding calculator web application as order bump for Backyard Beekeeping Blueprint.

### Features Implemented
✅ **Core Calculator**
- Colony size adjustments (nuc to large)
- Regional weight requirements for 8 US zones
- Automatic ratio selection (1:1 vs 2:1)
- Weight deficit calculations
- Feeding frequency recommendations

✅ **Regional Calendar**
- Monthly feeding schedules by region
- Critical date tracking
- Visual timeline with color coding
- Current month highlighting
- Dearth period identification

✅ **Emergency Diagnostics**
- Interactive decision tree
- Temperature-based feeding methods
- Starvation signs identification
- Emergency recipe selection
- Crisis intervention protocols

✅ **Batch Recipes**
- Standard batch sizes (1, 5, 10 gallons)
- Cost analysis (bulk vs retail)
- Mixing instructions
- Storage guidelines
- Print-friendly cards

✅ **Technical Features**
- PWA with offline support
- Service worker caching
- Local storage persistence
- Mobile-first responsive design
- Golden honey brand theme

### Calculations Based On
- Regional requirements: North (90 lbs), Central (60 lbs), South (40 lbs)
- Syrup ratios: 1:1 (spring/summer), 2:1 (fall/winter)
- Weight gain: 5 lbs/gallon (1:1), 7 lbs/gallon (2:1)
- Critical periods: Feb (starvation), Sept-Oct (winter prep)

### Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### Known Limitations
- Weather API not yet integrated
- Cost tracker pending implementation
- Manual weight estimation (no scale integration)

### Testing Instructions
1. Run local server: `python3 serve.py`
2. Open: http://localhost:8080
3. Test all 4 tabs
4. Check offline mode
5. Test on mobile device

### Integration Ready
- GoHighLevel compatible
- Standalone or embedded deployment
- Analytics tracking prepared
- User data exportable

---

## Planned Features (v1.1.0)
- [ ] Weather API integration
- [ ] Cost savings tracker
- [ ] Feeding reminders/notifications
- [ ] Multi-language support
- [ ] Dark mode option
- [ ] Export to calendar apps
- [ ] Hive weight tracking graphs
- [ ] Community sharing features2025-09-14: Created comprehensive order bump marketing copy in /marketing/bumps_and_upsells/order_bumps/feeding_calculator/
