import './App.css'
import './index.css';
import  Flow  from './components/Flow'
import { ChainNameProvider } from './components/chainName';
function App() {
  

  return (
    <>
    <div className="container">
      <ChainNameProvider>
      <Flow />
      </ChainNameProvider></div>
    
      
    </>
  )
}

export default App
