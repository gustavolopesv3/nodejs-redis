import IORedis from 'ioredis'
import {promisify} from 'util'

const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD
})


function getCache(key: string){
    const syncRedisGet = promisify(redis.get).bind(redis)
    return syncRedisGet(key)
}

function setCache(key: string, value: string){
    const syncRedisSet = promisify(redis.set).bind(redis)
    return syncRedisSet(key, value)
}

function removeCache(key: string){
    const syncRedisRemoveCache = promisify(redis.del).bind(redis)
    return syncRedisRemoveCache()
}

export {
    redis,
    getCache,
    setCache,
    removeCache
}