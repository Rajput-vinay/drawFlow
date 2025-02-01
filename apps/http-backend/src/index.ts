import express from "express"
import router from "./router/index.router"
const app = express()

const port = process.env.PORT
app.use(express.json())

app.use('/api/v1',router)
app.listen(port,()=>{
    console.log("http server start")
})