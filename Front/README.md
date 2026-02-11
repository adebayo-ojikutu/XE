# Frontend (React + Vite)

Frontend for the XE property ads challenge.

## Stack

- React 19 + Vite 7
- Tailwind CSS 4
- React Hook Form + Zod
- Axios
- Cypress (component + e2e)

## Requirements

- Node.js 18+
- npm 9+
- Backend running at `http://localhost:5000` (or your configured API URL)

## Environment Variables

Create `Front/.env`:

```bash
VITE_PORT=http://localhost:5000
```

This is used as Axios `baseURL` in `Front/src/Apis/api.js`.

## Run

```bash
cd Front
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

- `npm run dev` - run local dev server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build
- `npm run lint` - run ESLint
- `npm run cy:open` - open Cypress UI
- `npm run cy:run:component` - run component tests
- `npm run cy:run:api` - run API e2e test (`cypress/e2e/api/backend.cy.js`)

## Main Pages/Modules

- `Front/src/pages/PropertyAdsPage.jsx` - property ads table and actions
- `Front/src/Components/Modal/PropertyAd.jsx` - create/edit form modal
- `Front/src/Apis/` - API clients

## Notes

- Area autocomplete starts after 3 characters and requires selecting a suggestion to set `placeId`.
