import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';


dotenv.config();

import { userRouter } from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({extended: true }));
app.use(cors())
app.use("/user", userRouter);


// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = dirname(__filename);

app.once("ready", () => console.log("Server is ready"));

app.listen(PORT, () => console.log("Listening to port " + PORT));

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, '../views/logIn.html'));
})