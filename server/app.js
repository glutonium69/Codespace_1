import express from "express";
import { server, listen } from "./server.js";


server.use(express.urlencoded({ extended: true })); 
server.use(express.json());
server.post("/submit-form", (req, res) => {
    //  extract the data from data 
    const { message } = req.body;

    console.log(message);
    res.json({
        success: true
    })
})

listen();