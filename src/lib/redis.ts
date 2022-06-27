import IORedis from 'ioredis'

const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD
})


async function getCache(key: string){
    return redis.get(key)
}

async function setCache(key: string, value: string, expire?: number){

        if(expire){
            return redis.set(key, value, 'EX', 10)
        } {
            return redis.set(key, value)
        }
 
}

async function removeCache(key: string){
    const reponse = await redis.del(key)
    return reponse
}

export {
    redis,
    getCache,
    setCache,
    removeCache
}