import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Sale } from "../../models/sale/Sale";
import { randomUUID } from "node:crypto"

export const sale = async (req: Request, res: Response) => {
    try {

        const orders = req.body
        await Sale.registerSale(randomUUID(), orders.orders, orders.methodPayment)

        return res.status(StatusCodes.OK).end()
    } catch (error: any) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}