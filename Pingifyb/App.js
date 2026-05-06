const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({});
const port = process.env.PORT || 5000;
const connectDB = require('./config/conntecDB');
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoute");

//database connection
// console.log(process.env.JWT_SECRET); 
connectDB();

//middleware 
app.use(cors(
    { 
        origin: "http://localhost:5173",
        credentials: true,
    } 
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//router 

app.get("/", (req, res) => {
    res.send("Api is running...");
})
app.use("/user", userRoutes)
app.use("/message", messageRoute)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
// kumawatvansh365_db_user
// CvFv1GapIV1QvVGb
// mongodb+srv://kumawatvansh365_db_user:CvFv1GapIV1QvVGb@pingify.x4phq1u.mongodb.net/?appName=pingify
// mongodb+srv://user:password@pingify.x4phq1u.mongodb.net/?appName=pingify