import express from 'express'
import UserController from './controllers/UserController'
import redis from './lib/cache'

const app = express()

app.get('/', (req, res) => res.send('listening'))
app.get('/users', UserController.findAll)
app.post('/reset-cache', async (req, res) =>{
    try {
        await redis.del(req.body.key)
        return res.json({
            process: 'success'
        })
    } catch (error) {
        return res.json({
            error
        })
    }
})


app.listen(3000, ()=> console.info('API stated, PORT 3000'))