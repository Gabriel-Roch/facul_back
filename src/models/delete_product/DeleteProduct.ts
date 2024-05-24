import { pool } from "../../database/pool"

export class DeleteProduct {

    static async deleteProduct(id_product: string) {
        const conn = await pool.getConnection()
        try {
            await conn.beginTransaction()

            const deleteStock = "DELETE FROM stock_products WHERE fk_id_products = ?"
            await conn.query(deleteStock, [
                id_product
            ])

            const deletePrice = "DELETE FROM  price_products WHERE fk_id_product = ?"
            await conn.query(deletePrice, [
                id_product
            ])

            const deleteProduct = "DELETE FROM products WHERE id_products = ?"
            await conn.query(deleteProduct, [
                id_product
            ])

        } catch (error) {
            console.log(error)
            throw ("Error deleted Product!")
        } finally {
            await conn.release()
        }
    }
}