export class SalesOrder {
    id_sales?: string
    fk_id_user_sale?: string
    s_status?: string
    dt_sale?: string

    set_id_sales(id_sales: string) {
        this.id_sales = id_sales
    }
    set_fk_id_user_sale(fk_id_user_sale: string) {
        this.fk_id_user_sale = fk_id_user_sale
    }
    set_s_status(s_status: string) {
        this.s_status = s_status
    }
    set_dt_sale(dt_sale: string) {
        this.dt_sale = dt_sale
    }
}