import express from "express";
import router from "./router/Login.route.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors({
    origin:process.env.APP_HOST,
    credentials:true
}))
app.use("/", router);

export default app;
