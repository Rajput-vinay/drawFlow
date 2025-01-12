import express from "express"

const app = express()

app.use(express.json())

app.listen(()=>{
    console.log("http server start")
})