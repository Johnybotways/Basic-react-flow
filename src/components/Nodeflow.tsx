import { createContext, useContext, useState } from "react";

const NodeFlowContext = createContext();

export const useNodeFlow = () => useContext(NodeFlowContext);

export const NodeFlowProvider = ({children}) => {
    


return (
    <NodeFlowProvider.Provider value={{}}>{children}</NodeFlowProvider.Provider>
)}