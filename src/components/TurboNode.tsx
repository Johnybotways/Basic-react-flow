import { memo, ReactNode, useState, useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FiCloud } from 'react-icons/fi';

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

export default memo(({ data }: NodeProps<TurboNodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=> {console.log(`isopen: ${isOpen}`)}, [isOpen])
  // const handleClick = () => {
  //   console.log("clicked")
  //   setIsOpen(prevState => !prevState);
    
  // };
  
  
  return (
    <>
      <div className="cloud gradient">
        <div >
          <button onClick={() => setIsOpen((v) => !v)}><FiCloud /></button>
          
          
        </div>
      </div>
      <div className="wrapper gradient">
        <div className="inner">
          <div className="body" >
            {data.icon && <div className="icon" >{data.icon}</div>}
            <div>
              <div className="title">{data.title}</div>
              {data.subline && <div className="subline">{data.subline}</div>}
            </div>
          </div>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </div>
      </div>
    </>
  );
});
