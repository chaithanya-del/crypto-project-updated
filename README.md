Crypto Trader App - README (TXT Version)
==========================================

A React + TypeScript + Vite based Crypto Trading App that allows users to:
- Browse crypto assets with live prices
- Sort and filter assets
- Buy/Sell actions via dropdown
- Swap between crypto and fiat values in the Trade page
- Login/logout with basic local authentication
- Fully responsive, modern UI

------------------------------------------------------------
FEATURES
------------------------------------------------------------
- React + TypeScript + Vite for a fast development experience
- React Query for data fetching & caching
- Zustand for state management (auth + UI state)
- Protected Trade Page — login required
- Swap button for crypto ↔ fiat calculation
- Error Boundaries for better error handling
- Lazy loading for better performance
- Environment-based API configuration
- Clean folder structure and modular components

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------
crypto-trader-reviewed-fixed/
  src/
    components/          # UI components
      table/             # Asset table components
    lib/                 # API utilities
    routes/              # Pages (Home, Trade)
    shell/               # App shell & routing
    state/               # Zustand stores
    styles/              # Styling files
    types.ts             # TypeScript types
    main.tsx             # Entry point
  public/                # Public assets (optional)
  index.html             # App HTML template
  package.json           # Project dependencies
  tsconfig.json          # TypeScript config
  vite.config.ts         # Vite config
  README.txt             # This file (TXT)

------------------------------------------------------------
PREREQUISITES
------------------------------------------------------------
- Node.js v18 or above (https://nodejs.org/)
- npm (comes with Node.js)

Check versions:
  node -v
  npm -v

------------------------------------------------------------
1) DOWNLOAD & EXTRACT
------------------------------------------------------------
1. Download the zip: crypto-trader-reviewed-fixed.zip
2. Extract it to a folder, for example:
   C:\Users\<YourName>\Documents\crypto-trader-reviewed-fixed
3. Open the folder in Visual Studio Code.

------------------------------------------------------------
2) INSTALL DEPENDENCIES
------------------------------------------------------------
Open a terminal in the project root and run:
  npm install

If node_modules exists but is broken, clean and reinstall:
  rm -rf node_modules package-lock.json
  npm install

------------------------------------------------------------
3) ENVIRONMENT VARIABLES (OPTIONAL BUT RECOMMENDED)
------------------------------------------------------------
Create a .env file in the project root with the following lines:

  VITE_MESSARI_BASE=https://data.messari.io
  VITE_CG_BASE=https://api.coingecko.com

These defaults are also used if .env is not provided.

------------------------------------------------------------
4) RUN THE APP LOCALLY
------------------------------------------------------------
Start the Vite dev server:
  npm run dev

Open in your browser:
  http://localhost:5173

If port 5173 is busy, Vite will choose another port—check the terminal output.
You can also force a port:
  npm run dev -- --port 5175

------------------------------------------------------------
5) BUILD FOR PRODUCTION
------------------------------------------------------------
Create an optimized build:
  npm run build

Preview the production build locally:
  npm run preview

The built files will be in the dist/ directory.

------------------------------------------------------------
6) DEPLOY TO GITHUB PAGES (OPTIONAL)
------------------------------------------------------------
1. Install gh-pages:
     npm install gh-pages --save-dev

2. Add these scripts to package.json (if not already present):
     "build": "tsc -b && vite build",
     "preview": "vite preview",
     "deploy": "gh-pages -d dist"

3. Build and deploy:
     npm run build
     npm run deploy

Your app will be available at:
  https://<your-username>.github.io/<repo-name>

------------------------------------------------------------
TROUBLESHOOTING
------------------------------------------------------------
Issue: "@vitejs/plugin-react not found"
Fix:   npm install @vitejs/plugin-react --save-dev

Issue: Aliases like "@/lib/api" cannot be resolved
Fix:   Ensure vite.config.ts includes:
         resolve: { alias: { '@': path.resolve(__dirname, './src') } }

Issue: Port 5173 already in use
Fix:   Vite auto-switches ports, or run: npm run dev -- --port 5175

Issue: Dependencies mismatch / install errors
Fix:   Delete node_modules + package-lock.json, then npm install

------------------------------------------------------------
NPM SCRIPTS
------------------------------------------------------------
npm install        -> Install dependencies
npm run dev        -> Start development server
npm run build      -> Build production-ready code
npm run preview    -> Preview the production build locally
npm run deploy     -> Deploy to GitHub Pages (optional)

------------------------------------------------------------
AUTHOR
------------------------------------------------------------
Chaithanya Kumar
React Developer • Frontend Specialist
