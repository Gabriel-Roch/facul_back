import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Report } from "../../models/report/report";

export const report = async (req: Request, res: Response) => {
    try {

        const [result] = await Report.getAllReport()
        
        return res.status(StatusCodes.OK).json(result)
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}