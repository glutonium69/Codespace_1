import express from "express";
import cors from "cors";

const server = express();
server.use(cors());


const PORT = process.env.PORT || 5000;

server.on("ready", () => {
    console.log(`Server is ready}`);
});


server.get("/", (req, res) => {
    res.send("Hello World");
});


server.get("/test", (req, res) => {
    res.send("U r in test route");
});



server.get("/json", (req, res) => {
    res.json({
        message: "this is json returned by the api"
    })
})


export function listen(){
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });    
}