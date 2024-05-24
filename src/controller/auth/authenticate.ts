import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const Login = (req: Request, res: Response) => {
    try {

        console.log(req.body)

        return res.status(StatusCodes.OK).end()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: error
        })
    }
}