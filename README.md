# Expense Tracker

A modern React Native expense tracking application built with Expo and TypeScript. Track your daily expenses, manage categories, and visualize your spending patterns with detailed reports.

## Features

- 📱 **User Authentication** - Secure login and registration
- 💰 **Expense Management** - Add, edit, and delete transactions
- 🏷️ **Category System** - Organize expenses by custom categories
- 📊 **Reports & Analytics** - Visualize spending patterns and statistics
- 🔒 **Secure Storage** - JWT-based authentication with AsyncStorage
- 🎨 **Modern UI** - Clean and intuitive user interface

## Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Storage**: AsyncStorage

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Configure the API:
   - Update the API endpoint in `constants/config.ts`
   - Set your backend URL in the `API_CONFIG.BASE_URL`

## Running the App

Start the development server:

```bash
npm start
```

Run on specific platform:

```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web browser
```

## Project Structure

```
app/                 # App screens and navigation
├── (tabs)/         # Tab-based screens
├── login.tsx       # Authentication screens
└── register.tsx
components/
├── blocks/         # Reusable component blocks
├── forms/          # Form components
└── ui/             # Base UI components
lib/
├── api/            # API client and endpoints
└── utils/          # Utility functions
contexts/           # React contexts
hooks/              # Custom hooks
types/              # TypeScript type definitions
```

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint

## License

MIT
