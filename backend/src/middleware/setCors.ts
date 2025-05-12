import { ReturnType } from "api-server";
import { RequestApi } from "api-server";
import { ResponseApi } from "api-server";

const setCorsWarpper = (originUrl: string = "*", credentials: boolean) => {
    return (req: RequestApi, res: ResponseApi): ReturnType => {
        const allowedMethods = 'GET,POST,PUT,DELETE,OPTIONS';
        const allowedHeaders = 'Content-Type,Authorization'
    
        res.header('Access-Control-Allow-Origin', originUrl);
        res.header('Access-Control-Allow-Credentials', credentials.toString());
        res.header('Access-Control-Allow-Methods', allowedMethods);
        res.header('Access-Control-Allow-Headers', allowedHeaders);

        if (req.method === "OPTIONS") {
            res.status(204).send("");
            return ReturnType.STOP;
        }

        return ReturnType.OK;
    }
}

export default setCorsWarpper;
