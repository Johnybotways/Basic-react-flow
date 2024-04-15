import './App.css'
import './index.css';
import  Flow  from './components/Flow'
import { NodeProvider } from './components/Nodeprovider';
function App() {
  

  return (
    <>
    <div className="container">
      <NodeProvider>
      <Flow />
      </NodeProvider>
      </div>
    
      
    </>
  )
}

export default App
