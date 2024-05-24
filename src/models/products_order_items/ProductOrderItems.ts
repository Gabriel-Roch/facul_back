export class ProductOrderItems {
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
    set_fk_id_supplier(fk_id_supplier: string) {
        this.fk_id_supplier = fk_id_supplier
    }
    set_p_active(p_active: string) {
        this.p_active = p_active
    }
}