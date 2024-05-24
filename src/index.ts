import { server } from "./server/server"
import { configDotenv } from "dotenv"
configDotenv()

const port = process.env.PORT

server.listen(port, () => console.log("server is running port : " + port))