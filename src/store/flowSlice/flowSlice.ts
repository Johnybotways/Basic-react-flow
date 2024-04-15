import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    nodes : [],
}

export const flowSlice = createSlice({
    name : "flow",
    initialState,
    reducers : {
        addNodeData : (state, action) => {
            state.nodes.push(action.payload);
        },
        updateNodeData: (state, action) => {
            const {nodeId, newData} = action.payload;

            const nodeToUpdate = state.nodes.find(node => node.id === nodeId);
            if (nodeToUpdate) {
                nodeToUpdate.data = newData;
            }
        },
        deleteNodeData : (state, action) => {
            const nodeIdToDelete =  action.payload;
            state.nodes = state.nodes.filter(node => node.id !== nodeIdToDelete)},

        updateNodes: (state, action) => {
            const updatedNodes = action.payload;
            state.nodes = updatedNodes;
        }
    },
    
});


export const {addNodeData, updateNodeData, deleteNodeData, updateNodes} = flowSlice.actions;

export default flowSlice.reducer;