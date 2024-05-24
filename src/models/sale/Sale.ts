import { pool } from "../../database/pool"
import { randomUUID } from "node:crypto"

interface saleOrder {
    id: string
    price: string
    quantity: number
    p_name: string
}

export class Sale {

    static async registerSale(id_sale: string, order: Array<saleOrder>, method_payment: string) {
        const conn = await pool.getConnection()
        try {
            conn.beginTransaction()

            const sqlSale = "INSERT INTO sales_order(id_sales, fk_id_user_sale, s_status, fk_p_type_name) VALUES (?, 1, 'PAGO', ?);";
            await conn.query(sqlSale, [
                id_sale,
                method_payment
            ])

            const sqlOrder = `
            INSERT INTO 
                 product_order_items (id_p_order, fk_id_sales, fk_id_product, qty_item, price_purchase_item, price_sale_item)
            VALUES 
                (
                ?,
                ?, 
                ?, 
                ?, 
                (SELECT purchase_price FROM price_products WHERE fk_id_product = ? AND price_active = 1), 
                (SELECT sale_price FROM price_products WHERE fk_id_product = ? AND price_active = 1)
             )`

            const sqlStockQty = `
             set@newValue := (select (SELECT qty FROM stock_products WHERE fk_id_products = ?) - ?);`

             const sqlSubStock = `
             UPDATE stock_products SET qty =  @newValue WHERE fk_id_products = ?
             `

            for await (const row of order) {

                await conn.query(sqlStockQty, [
                    row.id,
                    row.quantity
                ])

                await conn.query(sqlSubStock,[
                    row.id
                ])

                await conn.query(sqlOrder, [
                    randomUUID(),
                    id_sale,
                    row.id,
                    row.quantity,
                    row.id,
                    row.id
                ])
            }

            conn.commit()
        } catch (error: any) {
            console.log(error)
            conn.rollback()
            throw ("Error register Sale")
        } finally {
            conn.release()
        }
    }
}