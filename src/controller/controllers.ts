import * as usersController from "./users/users"
import * as supplierController from "./supplier/supplier"
import * as masterPayments from "./payments/payments"
import * as products from "./products/products"
import * as priceProduct from "./price_products/priceProducts"
import * as sale from "./sale/sale"
import * as reports from "./report/report"

export const controllers = {
    ...usersController,
    ...supplierController,
    ...masterPayments,
    ...products,
    ...priceProduct,
    ...sale,
    ...reports
}
