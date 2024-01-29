// server.js
import express from "express";
import cors from "cors";

const server = express();

const PORT = 5000;

// Use the cors middleware
server.use(cors());
server.use(express.json()); // Parse JSON bodies
server.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

server.on("ready", () => {
    console.log(`Server is ready`);
});

server.get("/", (req, res) => {
    res.send("<h1>Server Working</h1>");
})

server.post("/submit-form", (req, res) => {
    const { message } = req.body;
    console.log(message);
    if (message) {
        res.json({ success: true, message });
    } else {
        res.status(400).json({ success: false, error: "Message is required" });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
