import express from "express";

export const userRouter = express.Router();

userRouter.get("/signIn", (req, res) => {
    res.send("<h2>noice</h2>");
})