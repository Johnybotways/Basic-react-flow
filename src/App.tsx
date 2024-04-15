import './App.css'
import './index.css';
import  Flow  from './components/Flow'
import { ChainNameProvider } from './components/chainName';
import { NodeProvider } from './components/Nodeprovider';
function App() {
  

  return (
    <>
    <div className="container">
      <NodeProvider>
      <ChainNameProvider>
      <Flow />
      </ChainNameProvider>
      </NodeProvider>
      </div>
    
      
    </>
  )
}

export default App
