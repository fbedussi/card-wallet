# Copilot Instructions for Card Wallet PWA

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React Progressive Web App (PWA) for storing and managing fidelity cards as barcodes. The app uses TypeScript, Vite, and modern web APIs.

## Architecture & Patterns
- **Tech Stack**: React 19 + TypeScript + Vite + PWA
- **Barcode Libraries**: @zxing/library for scanning, jsbarcode for rendering
- **Storage**: localStorage for persistence
- **Styling**: CSS-in-JS with inline styles for components, CSS modules for global styles

## Data Structure
Cards are stored in the format:
```typescript
interface Card {
  id: string;
  name: string;
  code: number;
}
```

## Component Guidelines
- Use functional components with hooks
- Include TypeScript interfaces for all props
- Embed styles directly in components using style tags for component-specific styling
- Use CSS classes in App.css for global application styles
- Handle errors gracefully with user-friendly messages

## Code Conventions
- Use descriptive variable and function names
- Prefer composition over inheritance
- Keep components focused and single-purpose
- Use proper TypeScript types throughout
- Handle async operations with proper error handling

## PWA Features
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for mobile-first experience
- Camera access for barcode scanning

## Browser Compatibility
- Target modern browsers with ES2020+ support
- Use progressive enhancement for PWA features
- Graceful degradation for devices without camera access
