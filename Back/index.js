const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();
const PropertyAd = require("./server/api/endpoints/propertyAd.js");
const Area = require("./server/api/endpoints/area.js");

app.use(
  cors({
    // origin: "*", // Allow all origins
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(mongoSanitize());

require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// This is suposed to be at the .evn file but for simplicity, I'm keeping it here.
// and also, this is a test database, so no harm done. Please don't use this connection string for anything else.
mongoose.connect(
  "mongodb+srv://porama4699_db_user:BInbamXpEOgnpLtq@xe.kzsbbyy.mongodb.net/?appName=XE&retryWrites=true&w=majority",
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  },
);
const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connected to database: ${db.name}`);
});
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Property Ads (public endpoints for frontend classifieds module)
app.get("/properties/page-all", PropertyAd.getPropertyAds);
app.post("/properties/create", PropertyAd.addPropertyAd);
app.put("/properties/update/:id", PropertyAd.updatePropertyAd);
app.delete("/properties/delete/:id", PropertyAd.deletePropertyAd); 

// area list
app.get("/area/list", Area.getPropertyAds);

const port = 5000;

app.listen(port, () => console.log(`Server online on port ${port}`));
// connectDB()
