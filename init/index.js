
require("dotenv").config(); // <-- .env load

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("connected to DB");
     initDB();   // <-- CALL THIS
  })
  .catch((err) => {
    console.log(err);
  });

// async function main() {
//   console.log("Connected DB:", MONGO_URL);
//   await mongoose.connect(MONGO_URL);
// }
// require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

const initDB = async () => {
  await Listing.deleteMany({});
 initData.data = initData.data.map((obj)=>({...obj,owner:"69aaed9a05e7b6aafdfad3b8"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

 

// require("dotenv").config();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/wanderlust";

// async function main() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("Connected to DB:", MONGO_URL);
//     await initDB();
//   } catch (err) {
//     console.log("Connection error:", err);
//   }
// }

// main();

// const initDB = async () => {
//   try {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({
//       ...obj,
//       owner: "69aaed9a05e7b6aafdfad3b8"
//     }));
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
//   } catch (err) {
//     console.log("InitDB error:", err);
//   }
// };