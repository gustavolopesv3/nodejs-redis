import axios from "axios";
import { getCache, setCache } from "../../lib/redis";
import {REDIS_KEYS} from '../../helpers/constants'

type findByCepType = {
    success: boolean,
    data?: any,
    error?: any,
    isDataCached?: boolean
}
class ViaCep {
    VIA_CEP_URL: string
    constructor(){
        this.VIA_CEP_URL = 'viacep.com.br/ws'
    }

    static async getAdressByCep(cep: string):Promise<findByCepType> {
        const keyOfCache = REDIS_KEYS.CEP+cep
        const cachedData = await getCache(keyOfCache)
        if(cachedData){
            return {
                success: true,
                isDataCached: true,
                data: JSON.parse(cachedData)
            }
        } else {
            const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            if(data.erro){
                return {
                    success: false,
                    error: `erro ao buscar cep: ${cep}`
                }
            }
            await setCache(keyOfCache, JSON.stringify(data), 10)
            return {
                success: true,
                isDataCached: false,
                data: data
            }
        }
    }
}

export default ViaCep