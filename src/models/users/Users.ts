
import { pool } from "../../database/pool"
import { generateHashMd5 } from "../../services/crypto"

export class Users {

    id_user?: string
    u_name?: string
    username?: string
    u_password?: string
    lv_access?: string
    dt_insert?: string

    constructor(id_user?: string, u_name?: string, username?: string, u_password?: string, lv_access?: string) {
        this.id_user = id_user
        this.u_name = u_name
        this.username = username
        this.u_password = u_password
        this.lv_access = lv_access
    }

    set_id_user(id_user: string) {
        this.id_user = id_user
    }
    set_u_name(u_name: string) {
        this.u_name = u_name
    }
    set_username(username: string) {
        this.username = username
    }
    set_u_password(u_password: string) {
        this.u_password = u_password
    }
    set_lv_access(lv_access: string) {
        this.lv_access = lv_access
    }
    set_dt_insert(dt_insert: string) {
        this.dt_insert = dt_insert
    }

    static async getAllUsers(): Promise<any> {
        try {
            const sql = "SELECT * FROM users;"
            return await pool.query(sql)
        } catch (error) {
            console.log(error)
            throw ("Error getting all users")
        }
    }

    async registerNewUser() {
        try {
            const sql = `INSERT INTO 
            users 
            (id_user, u_name, username, u_password, lv_access)
            VALUES 
            (?,?,?,?,?);`

            return await pool.query(sql, [
                this.id_user,
                this.u_name,
                generateHashMd5(this.u_password as string),
                this.u_password,
                this.lv_access
            ])
        } catch (error) {
            console.log(error)
            throw ("Error register user!")
        }
    }

    async getPasswordByUser() {
        try {
            if (this.username == undefined || this.username == "") {
                throw ("username not defined!")
            }
            const sql = "SELECT u_password FROM users WHERE username = ?";
            return await pool.query(sql, [
                this.username
            ])
        } catch (error) {
            console.log(error)
            throw ("Error Getting password!")
        }
    }

}
