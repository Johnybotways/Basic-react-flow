import { createContext, useContext, useState } from "react";



const NodeContext = createContext();

export const useNodeContext = () => {
    return useContext(NodeContext)
};

export const NodeProvider = ({children}) => {
    const initialNodes = [];

    const [nodes, setNodes] = useState(initialNodes);

    const updateNodeData = (nodeId, newData) => {
        setNodes((prevNodes) => {
          const updatedNodes = prevNodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: newData };
            }
            return node;
          });
          return updatedNodes;
        });
      };

      return (<>
      <NodeContext.Provider value = {{nodes, setNodes, updateNodeData}}>{children}</NodeContext.Provider>
      </>)
}