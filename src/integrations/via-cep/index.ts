import axios from "axios";
import { getCache } from "../../lib/cache";


class ViaCep {
    VIA_CEP_URL: string
    constructor(){
        this.VIA_CEP_URL = 'viacep.com.br/ws'
    }

    async getAdressByCep(cep: string){

        const cachedData = await getCache(cep)
        if(cachedData){
            return cachedData
        } else {
            const {data} = await axios.get(`this.VIA_CEP_URL/${cep}/json`)
        }
    }
}