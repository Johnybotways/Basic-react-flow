import { memo, ReactNode, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FiCloud } from 'react-icons/fi';

export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
};

export default memo(({ data }: NodeProps<TurboNodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // useEffect(()=> {console.log(`isopen: ${isOpen}`)}, [isOpen])
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
      <div className={`wrapper gradient ${isOpen ? 'expanded' : ''}`}>
        <div className="inner">
          <div className="body" >
            {data.icon  && <div className="icon" >{data.icon}</div>}
            <div>
              {isOpen && (
            <div>
              
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='chain name'/>
            </div>
          )}
              {!isOpen && <div className="title">{inputValue}</div>}
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
