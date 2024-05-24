import { Request, Response, response } from "express";
import { StatusCodes } from "http-status-codes";
import { Products } from "../../models/products/Products";
import { randomUUID } from "node:crypto"
import { StockProducts } from "../../models/stock_products/StockProducts";
import { EditProducts } from "../../models/edit_products/EditProducts";
import { DeleteProduct } from "../../models/delete_product/DeleteProduct";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const [result] = await Products.getAllProductsAndSupplier()
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: true,
            message: error
        })
    }
}

export const registerProducts = async (req: Request, res: Response) => {
    try {

        const randonIdProduct = randomUUID()

        const {
            name_product,
            id_supplier,
            qty_stock
        } = req.body

        if (name_product === undefined || name_product === null ||
            id_supplier === undefined || id_supplier === null ||
            qty_stock === undefined || qty_stock === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: true,
                message: "name_product, id_supplier, or qty_stock is not defined"
            });
        }

        const stockProduct = new StockProducts()
        stockProduct.set_id_products(randonIdProduct)
        stockProduct.set_p_name(name_product)
        stockProduct.set_fk_id_supplier(id_supplier)
        stockProduct.set_qty(qty_stock)

        await stockProduct.registerSotckProduct()

        return res.status(StatusCodes.CREATED).end()
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: false,
            message: error
        })
    }
}

export const updateProducts = async (req: Request, res: Response) => {
    try {

        const {
            id_product,
            p_name,
            qty_stock,
            purchase_price,
            sale_price,
            id_supplier
        } = req.body

        const editProduct = new EditProducts(
            p_name,
            qty_stock,
            purchase_price,
            sale_price,
            id_supplier,
            id_product)

        await editProduct.editProductAndPriceAndSupplier()

        return res.status(StatusCodes.OK).json({
            error: false,
            message: "item updated successfully"
        })


    } catch (error: any) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {

        const {
            id
        } = req.query

        if (typeof id !== 'string') {
            return res.status(StatusCodes.BAD_GATEWAY).json({
                error: true,
                message: "id not defined or not string"
            })
        }

        await DeleteProduct.deleteProduct(id)

        return res.status(StatusCodes.OK).end()

    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}


