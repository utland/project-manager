import { createContext } from "react";

interface IProxyContext {
    proxy: boolean,
    setProxy: (value: boolean) => void,
}

const ProxyContext = createContext<IProxyContext>({
    proxy: false,
    setProxy: () => {}
});

export default ProxyContext;