import IORedis from 'ioredis'

const redis = new IORedis({
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD
})

export default redis