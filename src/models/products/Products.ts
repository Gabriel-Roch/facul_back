import { pool } from "../../database/pool"

export class Products {

    id_products?: string
    p_name?: string
    fk_id_supplier?: string
    p_active?: string

    set_id_products(id_products: string) {
        this.id_products = id_products
    }

    set_p_name(p_name: string) {
        this.p_name = p_name
    }

    set_p_active(p_active: string) {
        this.p_active = p_active
    }

    set_fk_id_supplier(fk_id_supplier: string) {
        this.fk_id_supplier = fk_id_supplier
    }

    constructor(id_product?: string, p_name?: string, fk_id_supplier?: string) {
        this.id_products = id_product
        this.p_name = p_name
        this.fk_id_supplier = fk_id_supplier
    }


    static async getAllProductsAndSupplier(): Promise<any[]> {
        try {
            const sql = `
            SELECT
            id_products as id,
            p_name,
            s_name as supplier,
            contact as  supplier_contact,
            qty as qty_stock,
            p_active,
            purchase_price,
            sale_price,
            price_active,
            id_supplier,
            case
               when (SELECT count(fk_id_product) FROM erp_system.product_order_items where fk_id_product = id_products) < 1 
               then "n"
               else "y"
              end status_sales
            FROM  products
            INNER JOIN 
            supplier ON fk_id_supplier = id_supplier
            INNER JOIN 
            stock_products ON id_products = fk_id_products
            left join 
            price_products on id_products = fk_id_product and price_active = 1
            `;

            return await pool.query(sql)
        } catch (error) {
            console.log(error)
            throw ("Error getting All Products!")
        }
    }

}