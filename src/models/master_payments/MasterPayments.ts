import { pool } from "../../database/pool"

export class MasterPayments {
    
    id_payments?: string
    p_type_name?: string

    set_id_payments(id_payments: string) {
        this.id_payments = id_payments
    }
    set_p_type_name(p_type_name: string) {
        this.p_type_name = p_type_name
    }

    constructor(id_payments?: string, p_type_name?: string) {
        this.id_payments = id_payments,
            this.p_type_name = p_type_name
    }

    static async getAllPayments(): Promise<any[]> {
        try {
            const sql = "SELECT p_type_name as label, p_type_name as value FROM master_payments;"
            return await pool.query(sql)
        } catch (error) {
            console.log(error)
            throw ("Error getting payments")
        }
    }

    async registerPaymentMethod(): Promise<void> {
        try {
            const sql = `INSERT INTO 
                master_payments 
            (id_payments, p_type_name)
            VALUES 
            (?,?)`

            await pool.query(sql, [
                this.id_payments,
                this.p_type_name
            ])

        } catch (error) {
            throw ("Error registed Payment method!")
        }
    }
}