import { configDotenv } from "dotenv"
configDotenv()
import mysql2 from "mysql2/promise"

export const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database : "erp_system",
    port: 3306
})