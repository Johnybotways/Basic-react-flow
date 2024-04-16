import { memo, ReactNode, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FiCloud } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { updateNodeData } from "../store/flowSlice/flowSlice";
export type TurboNodeData = {
  title: string;
  icon : ReactNode,
  subline?: string;
  chainname?:string;
};

export default memo(({ data, id }: NodeProps<TurboNodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  // const { updateNodeData } = useNodeContext();
  const dispatch = useDispatch();

  const handleInputChange = (e : any) => {
    const newValue = e.target.value;
    dispatch(updateNodeData({nodeId: id, newData: {...data, chainname:newValue}}))
  }

  return (
    <>
      <div className="cloud gradient">
        <div >
          <button onClick={() => setIsOpen((v) => !v)}><FiCloud /></button>
          </div>
          
      </div>
      <div className={`wrapper gradient ${isOpen ? 'expanded' : ''}`}>
        <div className="inner">
          <div className="body" >
            {data.icon  && <div className="icon" >{data.icon}</div>}
            <div>
              {isOpen && (
            <div>
              
              <input type="text" value={data.chainname} onChange={handleInputChange} placeholder='chain name'/>
            </div>
          )}
              {!isOpen && <div className="title">{data.chainname}</div>}
              {!isOpen && data.subline &&  <div className="subline">{data.subline}</div>}
            </div>
          </div>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
});
