import { NextFunction, Request, Response } from "express";
import ViaCep from "../integrations/via-cep";



class ViaCepController {
    static async findByCep(req: Request, res: Response, next: NextFunction) {
        try {
            const {cep} = req.params
            const data = await ViaCep.getAdressByCep(cep)
            if(!data.success){
                return res.status(400).json(data)
            }
            return res.json(data)
        } catch (error) {
            console.log(error)
            return next(error)
        }
    }

}

export default ViaCepController