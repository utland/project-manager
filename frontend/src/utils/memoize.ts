interface ICache {
    [index: string]: any;
}

class CacheMap {
    private cache: ICache

    constructor() {
        this.cache = {};
    }

    set(name: string, data: any) {
        this.cache[name] = data;
    };

    get(name: string) {
        const res = this.cache[name];
        if (!res) return null;

        return res.data;
    }; 
    
    delete(name: string) {
        delete this.cache[name];
    }
}

const getUniqueKey = (...args: any[]): string => args.map(item => `${item.toString()}:${typeof item}`).join("/");

const memoize = (fn: Function) => {
    const cache = new CacheMap();
    
    return (...args: any[]) => {
        const key = getUniqueKey(...args);
        const cacheValue = cache.get(key);
        if (!cacheValue) {
            const value = fn(...args);
            cache.set(key, value);
            return value;
        }

        return cacheValue;
    }
}

export {memoize};