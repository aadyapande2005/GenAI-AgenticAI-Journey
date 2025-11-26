import express from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import queryRouter from "./routes/query.routes.js"

app.use("/api/v1/termsheet", queryRouter)

export default app