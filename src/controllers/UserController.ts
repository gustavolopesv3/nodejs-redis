import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { REDIS_KEYS } from "../helpers/constants";
import redis from "../lib/cache";

const prisma = new PrismaClient()

class UserController {
    static async findAll(req: Request, res: Response) {
        try {

            console.time('## FIND USERS cached')
            const cachedUsers = await redis.get(REDIS_KEYS.USERS_ALL)

            if (cachedUsers) {
                console.timeEnd('## FIND USERS cached')
                return res.json(JSON.parse(cachedUsers))
            }


            console.time('## FIND USERS not cached')
            const users = await prisma.user.findMany()

            await redis.set(REDIS_KEYS.USERS_ALL, JSON.stringify(users))

            console.timeEnd('## FIND USERS not cached')
            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    }
}

export default UserController