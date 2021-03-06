import express from 'express'
import UserController from './controllers/UserController'
import ViaCepController from './controllers/ViaCepController'
import ViaCep from './integrations/via-cep'
import {redis, removeCache} from './lib/redis'

const app = express()
app.use(express.json())

app.get('/', (req, res) => res.send('listening'))
app.get('/users', UserController.findAll)
app.get('/users-cache', UserController.findAllSomeCache)

app.get('/cep/:cep', ViaCepController.findByCep)

app.post('/reset-cache', async (req, res) => {
    try {
        const { key } = req.body
        await removeCache(key)
        return res.json({
            success: true,
        })
    } catch (error) {
        return res.json({
            error
        })        
    }
})

app.listen(3000, () => console.info('API started, PORT 3000'))