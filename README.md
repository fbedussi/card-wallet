# 🎫 Card Wallet - Fidelity Card Manager

** this app is an experiment of vibe coding **

A Progressive Web App (PWA) built with React + TypeScript for storing and managing fidelity cards as barcodes.

## ✨ Features

- 📱 **Barcode Scanning**: Use your device camera to scan and decode barcodes
- 💾 **Local Storage**: Store cards securely in your browser with format `[{name: string, code: number, id: string}]`
- 🎯 **Barcode Display**: View stored cards as visual barcodes
- 📤 **Export/Import**: Backup and restore your card collection
- 🌐 **PWA Support**: Install on your device and use offline
- 📱 **Mobile-First**: Responsive design optimized for mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment

This project is configured for automatic deployment to GitHub Pages, the app will be automatically deployed on every push to main.

### Manual Deployment
```bash
# Deploy to GitHub Pages manually
npm run deploy
```

### Live Demo
Once deployed, your app will be available at: `https://YOUR_USERNAME.github.io/card-wallet/`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **PWA** - Progressive Web App capabilities
- **@zxing/library** - Barcode scanning
- **jsbarcode** - Barcode rendering
- **Workbox** - Service worker for offline functionality

## 📱 Usage

1. **Scan a Card**: Use the "Scan" tab to scan barcodes with your camera
2. **Add Name**: Give your card a meaningful name (e.g., "Starbucks", "Gym")
3. **View Cards**: Browse your collection in the "My Cards" tab
4. **Export/Import**: Backup your cards or restore from a backup file

## 🔧 Development

### Project Structure
```
src/
├── components/         # React components
│   ├── BarcodeScanner.tsx
│   ├── BarcodeDisplay.tsx
│   ├── CardForm.tsx
│   └── CardList.tsx
├── types/             # TypeScript type definitions
│   └── Card.ts
├── utils/             # Utility functions
│   └── CardStorage.ts
└── App.tsx           # Main application component
```

### Data Format
Cards are stored in localStorage with this structure:
```typescript
interface Card {
  id: string;      // Unique identifier
  name: string;    // User-friendly name
  code: number;    // Barcode number
}
```

## 🌐 PWA Features

- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile devices
- **Fast Loading**: Cached resources for instant startup
- **Responsive**: Adapts to any screen size

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
