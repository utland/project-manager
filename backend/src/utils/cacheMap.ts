import PrismaService from "../service/prisma.service";

interface IHttpReq {
    data: object;
    age: number;
}

interface ICache {
    [index: string]: IHttpReq;
}

class CacheMap {
    private cache: ICache
    age: number;

    constructor(maxAge: number) {
        this.age = maxAge;
        this.cache = {};
    }

    set(name: string, data: object) {
        this.cache[name] = {data, age: Date.now()};
    };

    get(name: string) {
        const res = this.cache[name];
        if (!res) return null;

        const isExpired = (Date.now() - res.age) > this.age;
        if (isExpired) {
            delete this.cache[name];
            return null;
        };

        return res.data;
    }; 
    
    delete(name: string) {
        delete this.cache[name];
    }
}

export default CacheMap;