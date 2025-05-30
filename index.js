const express = require("express");
const userRoutes = require("./routes/user.route");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const app = express();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connection was successful"))
    .catch(() => console.log("Oops something went wrong!!!"));

// Middleware
app.use(express.json());


// creating endpoint for the student database manipulation
app.use(userRoutes);


app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
