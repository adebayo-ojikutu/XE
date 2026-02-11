# XE 

Full-stack property ads application built with:

- Frontend: React + Vite + Tailwind + React Hook Form + Zod
- Backend: Node.js + Express + MongoDB (Mongoose)

This project implements a property ad creation flow with area autocomplete support and CRUD operations for persisted ads.

## Repository Structure

- `Front/`: React client
- `Back/`: Express API server

## Features Implemented

- Property ad form with validation
- Area autocomplete (starts at 3+ characters, updates while typing)
- Required area selection with `placeId` submission
- Property ad persistence in MongoDB
- Property list page to view persisted ads
- Edit and delete property ads
- Basic API and component test files with Cypress
- Responsive UI for form and listing table

## Tech Stack

- `react`, `vite`, `tailwindcss`
- `react-hook-form`, `zod`, `@hookform/resolvers`
- `axios`
- `express`, `mongoose`, `cors`, `dotenv`, `morgan`
- `cypress`

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection access


## Run backend and frontend together from the repository root:

```bash
npm install
npm run dev
```

This starts:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:5173`


## OR Run individually

### 1. Backend

```bash
cd Back
npm install
npm run dev
```

API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd Front
npm install
npm run dev
```

Vite runs at `http://localhost:5173`.


## Scripts

Backend (`Back/package.json`):

- `npm run dev`: start API with nodemon
- `npm start`: start API with node

Frontend (`Front/package.json`):

- `npm run dev`: start Vite dev server
- `npm run build`: production build
- `npm run lint`: lint frontend
- `npm run cy:run:component`: run Cypress component tests
- `npm run cy:run:api`: run Cypress API e2e tests

## API Endpoints

- `GET /area/list?input=<query>`: proxy autocomplete API
- `GET /properties/page-all`: list property ads
- `POST /properties/create`: create property ad
- `PUT /properties/update/:id`: update property ad
- `DELETE /properties/delete/:id`: delete property ad

## Challenge Coverage Summary

Core requirements met:

- React frontend + Node backend
- Form for creating property ads
- Autocomplete integration with 3-character threshold
- Required area and `placeId` handling
- API error handling in backend and frontend

Bonus items met:

- Mobile-friendly/responsive form
- Persistence in database
- Page showing persisted ads


## screenshots
- ads data page
  <img width="1143" height="565" alt="image" src="https://github.com/user-attachments/assets/ba7f7405-7c01-4bd4-80ef-3874b78e2f44" />

- form modal
  
  <img width="720" height="705" alt="image" src="https://github.com/user-attachments/assets/b06dab12-31df-4f13-8533-33159395fcb1" />




