import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./src/routes/auth.js"
import usersRoute from "./src/routes/users.js"
import hotelsRoute from "./src/routes/hotels.js"
import roomsRoute from "./src/routes/rooms.js"
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();
dotenv.config()
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("connected")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnect!")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDb Connected!")
});


app.get('/user', (req, res) => {
    res.send("avc user")
})

// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {

    const errStatus = err.status || 500
    const errMessage = err.message || "Some thing went wrong !"
    console.log("middleware")
    // res.send("Hello 1")
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack,
    })

})

app.listen(5000, () => {
    connect();
    console.log("Connected backend on port :", 5000)
})