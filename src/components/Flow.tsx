import ReactFlow, {
  Controls,
  addEdge,
  useEdgesState,
  applyNodeChanges,
  ReactFlowProvider,
  Node,
  Edge,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomEdge from "./CustomEdge";
import TurboNode, { TurboNodeData } from "./TurboNode";
import Icon from "./FunctionIcon";
import { useCallback, useState } from "react";
import { GiBreakingChain } from "react-icons/gi";


import Sidebar from "./Sidebar";

const initialEdges: Edge[] = [];

const edgeTypes = {
  turbo: CustomEdge,
};
// const edgeTypes = {
//   turbo: CustomEdge,
// };
let id = 0;
const getId = () => `dndnode_${id++}`;
const initialNodes: Node<TurboNodeData>[] = [];
const nodeTypes = {
  turbo: TurboNode,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const Flow = () => {
  
  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = "turbo";

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { title: `Node ${id}`, icon: <GiBreakingChain /> },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [nodes]
  );

  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "turbo" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );
  // const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

 

  return (
    <div className="container">
      <div className="flow" style={{ height: "600px", width: "1100px" }}>
        <ReactFlowProvider>
        {/* <div className="reactflow-wrapper" ref={reactFlowWrapper}> */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <Controls />
          <svg>
            <defs>
              <linearGradient id="edge-gradient">
                <stop offset="0%" stopColor="#ae53ba" />
                <stop offset="100%" stopColor="#2a8af6" />
              </linearGradient>

              <marker
                id="edge-circle"
                viewBox="-5 -5 10 10"
                refX="0"
                refY="0"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto"
              >
                <circle
                  stroke="#2a8af6"
                  strokeOpacity="0.75"
                  r="2"
                  cx="0"
                  cy="0"
                />
              </marker>
            </defs>
          </svg>
        </ReactFlow>
        {/* <ReactFlowProvider/> */}
        </ReactFlowProvider>
      </div>
      <Sidebar ></Sidebar>
    </div>
  );
};
export default Flow;
