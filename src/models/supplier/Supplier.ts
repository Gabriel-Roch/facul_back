import { pool } from "../../database/pool"

export class Supplier {

    id_supplier?: string
    s_name?: string
    contact?: string

    set_id_supplier(id_supplier: string) {
        this.id_supplier = id_supplier
    }
    set_s_name(s_name: string) {
        this.s_name = s_name
    }
    set_contact(contact: string) {
        this.contact = contact
    }

    constructor(id_supplier?: string, s_name?: string, contact?: string) {
        this.id_supplier = id_supplier
        this.s_name = s_name
        this.contact = contact
    }

    static async getAllSupplier(): Promise<any[]> {
        try {
            const sql = "SELECT id_supplier as id, s_name, contact, s_active FROM supplier;"
            return await pool.query(sql)
        } catch (error) {
            console.log(error)
            throw ("Error getting supplier!")
        }
    }

    async registerSupplier(): Promise<void> {
        try {
            const sql = `INSERT INTO 
            supplier (id_supplier, s_name, contact) 
                VALUES 
	        (?,?,?);`
            await pool.query(sql, [
                this.id_supplier,
                this.s_name,
                this.contact
            ])
        } catch (error) {
            console.log(error)
            throw ("Erro registed supplier!")
        }
    }

    static async getSupplierActive(): Promise<any[]> {
        try {
            const sql = "SELECT  id_supplier AS value, s_name as label FROM supplier WHERE s_active = 1;"
            return await pool.query(sql)
        } catch (error) {
            console.log(error)
            throw ("Error getting suplier active")
        }
    }
}