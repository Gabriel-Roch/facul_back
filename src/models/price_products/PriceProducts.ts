import { pool } from "../../database/pool"

export class PriceProducts {

    id_price_products?: string
    fk_id_product?: string
    purchase_price?: Float32Array
    sale_price?: Float32Array
    p_active?: string

    set_id_price_products(id_price_products: string) {
        this.id_price_products = id_price_products
    }
    set_fk_id_product(fk_id_product: string) {
        this.fk_id_product = fk_id_product
    }
    set_purchase_price(purchase_price: Float32Array) {
        this.purchase_price = purchase_price
    }
    set_sale_price(sale_price: Float32Array) {
        this.sale_price = sale_price
    }
    set_p_active(p_active: string) {
        this.p_active = p_active
    }

    constructor(
        id_price_products?: string,
        fk_id_product?: string,
        purchase_price?: Float32Array,
        sale_price?: Float32Array
    ) {
        this.id_price_products = id_price_products,
            this.fk_id_product = fk_id_product,
            this.purchase_price = purchase_price,
            this.sale_price = sale_price
    }

    async registerPrice(): Promise<void> {

        const conn = await pool.getConnection()
        try {
            conn.beginTransaction()

            const sqlUpdateOldPrices = "UPDATE price_products SET p_active = 0 WHERE fk_id_product = ?"

            conn.query(sqlUpdateOldPrices, [
                this.fk_id_product
            ])

            const sql = `INSERT INTO 
            price_products (id_price_products, fk_id_product, purchase_price, sale_price)
                  VALUES 
	        (?,?,?,?);`

            await conn.query(sql, [
                this.id_price_products,
                this.fk_id_product,
                this.purchase_price,
                this.sale_price
            ])

            conn.commit()

        } catch (error) {
            conn.rollback()
            console.log(error)
            throw ("Error registed price!")
        } finally {
            conn.release()
        }
    }

    async getAllPricesById(): Promise<any[]> {
        try {
            if (this.id_price_products == undefined) {
                throw ("Error id price not defined")
            }
            const sql = "SELECT *, id_price_products as id FROM  price_products WHERE fk_id_product = ?"

            return await pool.query(sql, [
                this.id_price_products
            ])

        } catch (error) {
            console.log(error)
            throw ("Error getting price by id")
        }
    }

}