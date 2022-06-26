import axios from "axios";
import { getCache } from "../../lib/cache";

type findByCepType = {
    success: boolean,
    data?: any,
    error?: any
}
class ViaCep {
    VIA_CEP_URL: string
    constructor(){
        this.VIA_CEP_URL = 'viacep.com.br/ws'
    }

    static async getAdressByCep(cep: string):Promise<findByCepType> {

        const cachedData = await getCache(cep)
        if(cachedData){
            return {
                success: true,
                data: cachedData
            }
        } else {
            const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            if(data.erro){
                return {
                    success: false,
                    error: `erro ao buscar cep: ${cep}`
                }
            }
            return {
                success: true,
                data: data
            }
        }
    }
}

export default ViaCep