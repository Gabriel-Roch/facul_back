import { pool } from "../../database/pool"
import { Products } from "../products/Products"

export class StockProducts extends Products {

    fk_id_products?: string
    qty?: number

    set_fk_id_products(fk_id_products: string) {
        this.fk_id_products = fk_id_products
    }

    set_qty(qty: number) {
        this.qty = qty
    }

    constructor(fk_id_product?: string, qty?: number) {
        super()
        this.fk_id_products = fk_id_product
        this.qty = qty
    }

    async registerSotckProduct(): Promise<void> {

        const conn = await pool.getConnection()

        try {

            await conn.beginTransaction()

            const sqlInsertProduct = `INSERT INTO 
            products (id_products, p_name, fk_id_supplier)
             VALUES
            (?,?,?);`

            const sqlInsertSotck = `INSERT INTO 
            stock_products (fk_id_products, qty)
              VALUES
	        (?, ?);`

            await conn.query(sqlInsertProduct, [
                this.id_products,
                this.p_name,
                this.fk_id_supplier
            ])

            await conn.query(sqlInsertSotck, [
                this.id_products,
                this.qty
            ])

            conn.commit()

        } catch (error) {
            conn.rollback()
            console.log(error)
            throw ("Error registed stock Product!")
        } finally {
            conn.release()
        }
    }

}