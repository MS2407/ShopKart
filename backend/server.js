const app = require("./app");
const connectDatabase = require("./Config/database");
const cloudinary = require("cloudinary");

//Handling Uncaught Exception  (consoling not defined varaibles)
process.on("uncaughtException", () => {
  console.log("Shutting Down the server due to Uncaught Exception");
  process.exit(1);
});

//connect config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//connect Database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is Working on http://localhost:${process.env.PORT}`);
});

//Handling Unhandled Promise Rejection (wring mongoDB URI)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the server due to Unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  });
});
