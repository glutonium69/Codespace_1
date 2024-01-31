import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import multer from "multer";
const upload = multer();
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./DB/connect.js";
import { UserModel } from "./DB/model/userModel.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'pug');

app.use(cors())

app.once("ready", () => console.log("Server is ready"));

app.listen(PORT, () => console.log("Listening to port " + PORT));


app.get("/", (req, res) => {
    res.send("<h2>Server is ON BABYYYYYYY</h2>");
})

app.post("/signIn",  upload.none(), async (req, res) => {

    const { email, password  } = req.body;

    if(!email || !password){
        res.status(401).json({status: 401})
        process.exit(1);
    }

    // console.log(user)

    // res.status(200).json(req.body)

    try {
        await connectDB();
        const user = await UserModel.find({ email: email, password: password })
        if(user.length === 0){
            res.status(404).json({status: false, message: "Element not found in the database"})
        }else{
            res.status(200)
        }

    } catch (error) {
        console.log(error)   
    }
    finally{
        await mongoose.disconnect();
    }
})


app.get("/signIn", upload.none(), (req, res) => {
    res.send("home")
})