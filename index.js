import express from "express";
import cors from "cors";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv()

const app = express();
const apiKey = process.env.API_KEY;
const corsOptions = {
    origin: "https://.vercel.app",
    optionsSuccessStatus: 200
};

const apiWeather = (param, cb)=>{
    console.log(param)
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${param[0]}&lon=${param[1]}&exclude=${param[2]}&appid=${apiKey}`)
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

app.get("/", (req, res) => res.send("Status: online"))

app.get("/api/v1/weather/:params",/* cors(corsOptions),*/ async (req, res, next) => { // lat; lon; exclude
    const params = req.params.params.split("&");
    
    apiWeather(params, (response)=>{
        res.send(response);
    });
});

app.listen(3000, ()=>{
    console.log("Listen on port 3000");
});