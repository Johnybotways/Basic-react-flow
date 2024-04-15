import ReactFlow, {
  Controls,
  addEdge,
  useEdgesState,
  Connection,
  updateEdge,
  applyNodeChanges,
  ReactFlowProvider,
  Edge,
  applyEdgeChanges,
  
} from "reactflow";
import "reactflow/dist/style.css";
import CustomEdge from "./CustomEdge";
import LabelEdge from "./LabelEgde";
import TurboNode from "./TurboNode";
import { useCallback, useState } from "react";
import { GiBreakingChain } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { addNodeData, deleteNodeData, updateNodes, updateEdges } from "../store/flowSlice/flowSlice";
import { useRef } from "react";
// const initialEdges: Edge[] = [];

const edgeTypes = {
  turbo: LabelEdge,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {
  turbo: TurboNode,
};

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
};

const Flow = () => {
  const edgeUpdateSuccessful = useRef(true);

  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


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
        data: { title: `Node ${id}` , icon : <GiBreakingChain/>},
      };

      // setNodes((nds) => nds.concat(newNode));
      dispatch(addNodeData(newNode));
    },
    [reactFlowInstance, id, dispatch]
  );
  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [nodes]
  // );
  const onNodesChange = useCallback(
    (changes : any) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(updateNodes(updatedNodes));
    },
    [dispatch, nodes]
  );

  // const onConnect = useCallback(
  //   (connection) => {
  //     const edge = { ...connection, type: "turbo" };
  //     setEdges((eds) => addEdge(edge, eds));
  //   },
  //   [setEdges]
  // );
  const onConnect = useCallback(
    (connection : any) => {
      console.log(connection)

        dispatch(
          updateEdges(
            addEdge(
              {
                ...connection,
                data: {
                  label: "True",
                }
              },
              edges
            )
          )
        );
      },
    [edges]
  );

  const onEdgesChange = useCallback(
    (changes : any) => {
      const updatedEdge = applyEdgeChanges(changes, edges);
      dispatch(updateEdges(updatedEdge));
    }, [dispatch, edges]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
edgeUpdateSuccessful.current = true;
      dispatch(updateEdges(updateEdge(oldEdge, newConnection, edges)));
    },
    [edges]
  );
  // const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
  const onEdgeUpdateEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeUpdateSuccessful.current) {
dispatch(updateEdges([...edges.filter((e: Edge) => e.id !== edge.id)]));
      }
      edgeUpdateSuccessful.current = true;
    },
    [edges]
  );
  const handleDeleteNode = useCallback(
    (nodeId) => {
      dispatch(deleteNodeData(nodeId))
    }, [dispatch]
  )
//   const onEdgeUpdateStart = useCallback(() => {
//     edgeUpdateSuccessful.current = false;
//   }, []);

//   const onEdgeUpdateEnd = useCallback(
//     (_: any, edge: Edge) => {
//       if (!edgeUpdateSuccessful.current) {
// dispatch(updateEdges([...edges.filter((e: Edge) => e.id !== edge.id)]));
//       }
//       edgeUpdateSuccessful.current = true;
//     },
//     [dispatch, edges]
//   );

  return (
    <div className="container">
      <Sidebar ></Sidebar>
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
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          onEdgeUpdate={onEdgeUpdate}
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
      
    </div>
  );
};
export default Flow;
