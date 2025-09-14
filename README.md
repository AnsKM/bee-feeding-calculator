# Seasonal Feeding Calculator & Schedule

A mobile-first web application designed to help beekeepers calculate precise feeding amounts and schedules based on their location, colony size, and time of year.

## Features

- **Smart Feeding Calculator**: Calculate exact sugar and water amounts for 1:1 and 2:1 syrup ratios
- **Regional Feeding Calendar**: Customized schedules for 8 US climate zones
- **Emergency Feeding Diagnostic**: Interactive flowchart to determine when to feed
- **Batch Recipe Cards**: Pre-calculated recipes for common batch sizes
- **Cost Savings Tracker**: Track feeding expenses and ROI
- **Offline Capability**: Works without internet connection
- **Mobile-First Design**: Optimized for use in the field

## Target Audience

- Beginning beekeepers (primary)
- Hobbyist beekeepers with 1-10 hives
- Age range: 35-65+ 
- Mobile phone/tablet users

## Technical Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- Progressive Web App capabilities
- Service Worker for offline functionality
- Local Storage for user preferences
- Responsive design with mobile-first approach

## Project Structure

```
/feeding-calculator-webapp/
├── index.html              # Main application
├── css/
│   ├── main.css           # Core styles
│   └── mobile.css         # Mobile-specific styles
├── js/
│   ├── calculator.js      # Feeding calculations
│   ├── calendar.js        # Regional calendar logic
│   ├── emergency.js       # Emergency feeding diagnostic
│   └── recipes.js         # Batch recipe generator
├── data/
│   ├── regions.json       # Regional zone data
│   ├── feeding-schedules.json # Seasonal schedules
│   └── critical-dates.json    # Important beekeeping dates
├── images/
│   ├── icons/            # UI icons
│   └── guides/           # Visual guides
├── service-worker.js      # Offline functionality
└── README.md             # This file
```

## Key Calculations

### Sugar Syrup Ratios

**1:1 Syrup (Spring/Summer)**
- 8 lbs sugar + 8 lbs water = ~1.5 gallons
- Used for: Spring buildup, stimulating brood production

**2:1 Syrup (Fall/Winter)**
- 16 lbs sugar + 8 lbs water = ~1.5 gallons
- Used for: Fall preparation, winter stores
- Colony weight gain: 1 gallon adds ~7 lbs stores

### Regional Winter Requirements

- **Southern US**: 40 lbs honey stores
- **Central US**: 60 lbs honey stores
- **Northern US**: 90 lbs honey stores

### Critical Dates

- **Spring Buildup**: March-May
- **Summer Dearth**: July-August
- **Fall Preparation**: September-October
- **Winter Emergency Checks**: December-February

## Development

### Running Locally

1. Clone the repository
2. Open `index.html` in a web browser
3. For service worker testing, use a local server:
   ```bash
   python3 -m http.server 8000
   ```

### Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## Integration

Designed to be hosted on GoHighLevel (GHL) platform for seamless integration with sales funnels and order bumps.

## Version History

- v1.0.0 - Initial release with core calculator functionality

## License

Proprietary - All rights reserved

## Contact

For questions or support, contact: [Support Email]