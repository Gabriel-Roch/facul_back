import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Supplier } from "../../models/supplier/Supplier";
import { randomUUID } from "node:crypto"

export const getAllSupplier = async (req: Request, res: Response) => {
    try {

        if (req.query.select) {
            const [supplierSelect] = await Supplier.getSupplierActive()
            return res.status(StatusCodes.OK).json(supplierSelect)
        }

        const [supplier] = await Supplier.getAllSupplier()
        return res.status(StatusCodes.OK).json(supplier)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}

export const registerSupplier = async (req: Request, res: Response) => {
    try {
        const {
            name,
            contact
        } = req.body

        if (name === undefined || contact === undefined || name === null || contact === null) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: true,
                message: "Name or contact is not defined"
            });
        }

        const supplier = new Supplier(
            randomUUID(),
            name,
            contact
        )
        await supplier.registerSupplier()
        return res.status(StatusCodes.CREATED).end()
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: error
        })
    }
}

export const updateSupplier = (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).end()
}

export const deleteSupplier = (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).end()
}
