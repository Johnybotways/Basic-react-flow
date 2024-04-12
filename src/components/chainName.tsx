import { createContext, useContext, useState } from "react";

const chainNameContext = createContext();

export const useChainName = () => useContext(chainNameContext);

export const ChainNameProvider = ({children}) => {
    const [chainName, setChainName] = useState('');

    const setChainNameById = (id, name) =>{
        setChainName((prev) => ({...prev, [id] : name}));
    };

    const getChainNameById = (id) => chainName[id] || '';


return (
    <chainNameContext.Provider value={{setChainNameById, getChainNameById}}>{children}</chainNameContext.Provider>
)}