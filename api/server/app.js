import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();

import { userRouter } from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors())
app.use("/user", userRouter);



app.once("ready", () => console.log("Server is ready"));

app.listen(PORT, () => console.log("Listening to port " + PORT));

app.get("/", (req, res) => {
    res.send("Hello World!");
})