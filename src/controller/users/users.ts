import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import { Users } from "../../models/users/Users";
import { randomUUID } from "node:crypto"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const [result] = await Users.getAllUsers()
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {

        const {
            u_name,
            username,
            u_password,
            lv_access
        } = req.body

        if (u_name === undefined || username === undefined || u_password === undefined || lv_access === undefined) {
            return res.status(StatusCodes.BAD_GATEWAY).end()
        }

        const users = new Users(
            randomUUID(),
            u_name,
            username,
            u_password,
            lv_access
        )

        await users.registerNewUser()
        return res.status(StatusCodes.CREATED).end()
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: true,
            message: error
        })
    }
}

export const updateUser = (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).end()
}

export const deleteUser = (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).end()
}
