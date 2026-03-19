import express from "express"


// local import 
import { ENV } from "./config/env.js"

const app = express()


app.get("/health", (req,res) => {
    res.json({status : "ok"})
})

app.listen(ENV.PORT, () => {
    console.log(`server is running on http://localhost:${ENV.PORT}`)
})