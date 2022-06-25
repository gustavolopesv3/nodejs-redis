import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { REDIS_KEYS } from "../helpers/constants";
import {getCache, setCache} from "../lib/cache";

const prisma = new PrismaClient()

class UserController {
    static async findAll(req: Request, res: Response) {
        try {
            const cachedUsers = await getCache(REDIS_KEYS.USERS_ALL)

            if (cachedUsers && cachedUsers.length > 0) {
                console.time('## FIND USERS cached')
                console.log(cachedUsers)
                console.timeEnd('## FIND USERS cached')
                return res.json(JSON.parse(cachedUsers))
            }

            console.time('## FIND USERS not cached')
            const users = await prisma.user.findMany()

            await setCache(REDIS_KEYS.USERS_ALL, JSON.stringify(users))

            console.timeEnd('## FIND USERS not cached')
            console.log('as')
            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    }

    static async findAllSomeCache(req: Request, res: Response) {
        try {
            console.time('## FIND USERS cached')
            const cachedUsers = await getCache(REDIS_KEYS.USERS_ALL)
            console.log(cachedUsers)
            console.timeEnd('## FIND USERS cached')
            if (cachedUsers){
                return res.json(JSON.parse(cachedUsers))
            }else {
                res.json([])
            }
        } catch (error) {
            console.log(error)
            return res.json({ error })
        }
    }
}

export default UserController