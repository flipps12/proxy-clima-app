import express from "express";
import cors from "cors";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv()

const app = express();
const apiKey = process.env.API_KEY;
const corsOptions = {
    origin: "https://react-web-clima.vercel.app/",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// const allowedOrigins = ['https://react-web-clima.vercel.app/', 'http://localhost:5173/'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'El origen ' + origin + ' no está permitido por la política CORS.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// };

const apiWeather = (param, cb)=>{
    console.log(param)
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${param[0]}&lon=${param[1]}&exclude=${param[2]}&appid=${apiKey}&lang=${param[3]}&units=metric`)
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
}

app.get("/", (req, res) => res.send("Status: online"))

app.get("/api/v1/weather/:params", async (req, res, next) => { // lat; lon; exclude: lang (es, en)
    const params = req.params.params.split("&");
    
    apiWeather(params, (response)=>{
        res.send(response);
    });
});

app.listen(3000, ()=>{
    console.log("Listen on port 3000");
});