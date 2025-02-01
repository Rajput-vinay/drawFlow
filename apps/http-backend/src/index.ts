import express from "express"
import router from "./router/index.router"
import dotenv from "dotenv"
dotenv.config()
const app = express()

const port = process.env.PORT || 5000

console.log(port)
app.use(express.json())

app.use('/api/v1',router)
app.listen(port,()=>{
    console.log("http server start")
})