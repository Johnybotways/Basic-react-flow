import { memo, ReactNode, useContext, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { FiCloud } from 'react-icons/fi';
import { useChainName } from './chainName';
import { useNodeContext } from './Nodeprovider';
export type TurboNodeData = {
  title: string;
  icon?: ReactNode;
  subline?: string;
  chainname?:string;
};

export default memo(({ data, id }: NodeProps<TurboNodeData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateNodeData } = useNodeContext();
  const {getChainNameById, setChainNameById} = useChainName();
  const [inputValue, setInputValue] = useState(getChainNameById(id));
  // const [inputValue, setInputValue] = useState('');
  // useEffect(()=> {console.log(`isopen: ${isOpen}`)}, [isOpen])
  // const handleClick = () => {
  //   console.log("clicked")
  //   setIsOpen(prevState => !prevState);
    
  // };

  

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // setInputValue(newValue);
    // setChainNameById(id, newValue);
    updateNodeData(id, {...data, chainname:newValue})
  }
  // const updatedData = {...data, chainname : inputValue}
  // console.log(updatedData)

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
