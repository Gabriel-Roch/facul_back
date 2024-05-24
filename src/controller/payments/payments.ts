import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MasterPayments } from "../../models/master_payments/MasterPayments"
import { randomUUID } from "node:crypto"

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const [result] = await MasterPayments.getAllPayments()
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}

export const registerPaymentsMethod = async (req: Request, res: Response) => {
    try {
        const {
            name_payments
        } = req.body
        const payments = new MasterPayments(
            randomUUID(),
            name_payments
        )
        await payments.registerPaymentMethod()
        return res.status(StatusCodes.CREATED).end()
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: error
        })

    }
}