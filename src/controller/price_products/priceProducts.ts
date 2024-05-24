import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { PriceProducts } from "../../models/price_products/PriceProducts";
import { randomUUID } from "node:crypto"

export const registedPriceProduct = async (req: Request, res: Response) => {
    try {
        const {
            id_product,
            purchase_price,
            sale_price
        } = req.body

        const priceProducts = new PriceProducts(
            randomUUID(),
            id_product,
            purchase_price,
            sale_price
        )
        await priceProducts.registerPrice()
        return res.status(StatusCodes.CREATED).end()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}


export const getAllPriceById = async (req: Request, res: Response) => {
    try {

        const {
            id_product
        } = req.query

        if (id_product === undefined || id_product === null) {
            return res.status(StatusCodes.BAD_GATEWAY).json({
                error: true,
                message: "id_product not definded!"
            })
        }

        const priceProducts = new PriceProducts()
        priceProducts.set_id_price_products(id_product as string)
        const [result] = await priceProducts.getAllPricesById()

        return res.status(StatusCodes.OK).json(result)

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}