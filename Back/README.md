# Backend (Node + Express + MongoDB)

Backend API for the XE property ads challenge.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- `cors`, `morgan`, `cookie-parser`, `express-mongo-sanitize`

## Requirements

- Node.js 18+
- npm 9+
- MongoDB connectivity

## Run

```bash
cd Back
npm install
npm run dev
```

Server runs at `http://localhost:5000`.

## Scripts

- `npm run dev` - run with nodemon
- `npm start` - run with node

## API Endpoints

- `GET /properties/page-all` - list property ads (latest first)
- `POST /properties/create` - create property ad
- `PUT /properties/update/:id` - update property ad
- `DELETE /properties/delete/:id` - delete property ad
- `GET /area/list?input=<query>` - proxy area autocomplete results

## Property Ad Model

Stored fields:

- `title` (required)
- `description`
- `price` (required)
- `adsType` (required: `Rent | Buy | Exchange | Donation`)
- `bedrooms` (required)
- `bathrooms` (required)
- `sizeSqm` (required)
- `area` (required)
- `placeId` (required)
- `amenities` (optional array)
