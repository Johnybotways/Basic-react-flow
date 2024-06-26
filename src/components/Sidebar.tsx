
const Sidebar = () => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };

    return (

        <>
        <div className="sidebar">
            {/* <div className="button p-2 font-mono font-semibold text-gray-900 shadow-2xl mr-5" onClick={onAddNode}>Add Node</div> */}
            <div className="button p-2 font-mono font-semibold text-white shadow-2xl mr-5" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Chain Block
      </div>
      <div className="button p-2 font-mono font-semibold text-white shadow-2xl mr-5" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Condition Block
      </div>
      <div className="button p-2 font-mono font-semibold text-white shadow-2xl mr-5" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Block
      </div>
        </div>

        {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
        </>
    )
}

export default Sidebar;