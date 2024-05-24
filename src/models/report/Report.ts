import { pool } from "../../database/pool"


export class Report {
    static async getAllReport() {
        try {
            
            const sql = `SELECT 
               id_sales as id,
               s_status,
               dt_sale,
               u_name,
               username,
               profit,
               ttl,
               fk_p_type_name
           FROM
               users
                   INNER JOIN
               (SELECT 
                   fk_p_type_name,
                       id_sales,
                       s_status,
                       dt_sale,
                       fk_id_user_sale,
                       SUM(qty_item * (CAST(price_sale_item AS DECIMAL (10 , 2 )) - CAST(price_purchase_item AS DECIMAL (10 , 2 )))) AS profit,
                       SUM(qty_item * (CAST(price_sale_item AS DECIMAL (10 , 2 )))) AS ttl
               FROM
                   erp_system.sales_order
               INNER JOIN product_order_items ON fk_id_sales = id_sales
               GROUP BY id_sales) sales ON sales.fk_id_user_sale = id_user`

               return await pool.query(sql)

        } catch (error: any) {
            console.log(error)
            throw ("Errro getting report")
        }
    }
}