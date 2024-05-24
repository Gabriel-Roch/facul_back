import express from "express"
import { route as route_index } from "../routes/index/routes"

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use((request, response, next) => {
    response.append("Access-Control-Allow-Origin", ["*"])
    response.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    response.append("Access-Control-Allow-Headers", "Content-Type")
    next()
})

server.use(route_index)

export { server }