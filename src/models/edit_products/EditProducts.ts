import { pool } from "../../database/pool"
import { randomUUID } from "node:crypto"

export class EditProducts {

    p_name?: string
    qty_stock?: string
    purchase_price?: string
    sale_price?: string
    id_supplier?: string
    id_product?: string

    constructor(
        name: string,
        stock: string,
        purchase_price: string,
        sale_price: string,
        id_supplier: string,
        id_product: string) {
        this.p_name = name
        this.qty_stock = stock
        this.purchase_price = purchase_price
        this.sale_price = sale_price
        this.id_supplier = id_supplier
        this.id_product = id_product
    }

    async editProductAndPriceAndSupplier() {
        const conn = await pool.getConnection()
        try {
            await conn.beginTransaction()
            const sql1 = `UPDATE products SET p_name = ?, fk_id_supplier = ? WHERE id_products = ?;`
            const sql2 = `UPDATE stock_products SET qty = ? WHERE fk_id_products = ?;`
            const sql3 = `UPDATE price_products SET price_active = 0 WHERE fk_id_product = ?;`
            const sql4 = `INSERT INTO price_products (id_price_products, purchase_price, sale_price, fk_id_product, price_active) VALUES (?,?,?,?,?);`

            await conn.query(sql1, [
                this.p_name,
                this.id_supplier,
                this.id_product
            ])

            await conn.query(sql2, [
                this.qty_stock,
                this.id_product
            ])

            await conn.query(sql3, [
                this.id_product
            ])

            await conn.query(sql4, [
                randomUUID(),
                this.purchase_price,
                this.sale_price,
                this.id_product,
                1
            ])

            await conn.commit()
        } catch (error) {
            console.log(error)
            await conn.rollback()
            throw  ("Error edit product")
        } finally {
            await conn.release()
        }
    }
}