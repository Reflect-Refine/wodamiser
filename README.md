# CrossFit WOD Randomiser PWA

A Progressive Web App that generates random CrossFit workouts, including standard CrossFit benchmark workouts, Hyrox-style training, and high-intensity challenges.

## Features

- **Random Workout Generation**: Get a new workout with a single click
- **Multiple Workout Modes**: Choose between Standard CrossFit, Hyrox-style, or intense "F**k Me Up" workouts
- **Movement Filtering**: Exclude movement types you don't want or can't perform
- **Workout Timer**: Built-in timer with stopwatch, countdown, and AMRAP modes
- **Workout History**: Track and review your completed workouts
- **Movement Demonstrations**: View detailed information and guidance for key movements
- **Offline Support**: Works offline as a Progressive Web App
- **External Data Source**: Option to connect to Google Sheets for custom workouts

## Installation Instructions

### For Users:

1. Visit the app URL in your mobile browser
2. For iOS:
   - Tap the "Share" button
   - Select "Add to Home Screen"
3. For Android:
   - Tap the menu button (three dots)
   - Select "Add to Home Screen" or "Install App"

### For Developers:

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Build for production: `npm run build`

## Google Sheets Integration

To connect your own workout database:

1. Create a Google Sheet with these columns:
   - Name: Workout name
   - Description: Detailed workout instructions
   - Type: "For Time", "AMRAP", etc.
   - Movements: Semicolon-separated categories (e.g., "barbells;gymnastics")
   - Difficulty: Beginner, Intermediate, Advanced, Elite
   - EstimatedTime: Expected duration (e.g., "10-15 minutes")
   - Category: regular, hyrox, or intense

2. Publish the sheet to the web (File > Share > Publish to web) as CSV

3. Update the GOOGLE_SHEET_URL in googleSheetsIntegration.js with your published URL

## Component Structure

The main component is split into multiple parts for easier editing and maintenance:

- Part 1: Imports, state declarations, and data structures
- Part 2: useEffect hooks and helper functions
- Part 3: Core functionality (fetching workouts, history management)
- Part 4: Component rendering - Header and navigation
- Part 5: Home tab implementation
- Part 6: Timer tab implementation
- Part 7: History and Settings tabs
- Part 8: Movement info modal and component closing

See the `src/components/README.md` file for detailed assembly instructions.

## Technology Stack

- React.js
- Tailwind CSS
- Lucide React Icons
- Service Workers for offline capability
- LocalStorage for data persistence
- Google Sheets API (optional)

## Browser Support

This PWA supports:
- Chrome (and Chromium-based browsers)
- Safari
- Firefox
- Edge

## License

This project is available for use under standard MIT license.

## Disclaimer

Always consult a professional trainer before attempting any exercise program. Use this app at your own risk.
