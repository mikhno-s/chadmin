import { useState } from 'react';
import './App.css';
import Connector from './components/connector/Connector'
import TopMenu from './components/topMenu/TopMenu'
import Wrapper from './components/Wrapper/Wrapper'

function App() {
  const [CHDisconnected, setCHDisconnected] = useState<Boolean>(false)
  const [showLoader, setShowLoader] = useState<Boolean>(true)


  return (
    <div id="App">
      <TopMenu setCHDisconnected={setCHDisconnected} />
      <Connector
        CHDisconnected={CHDisconnected}
        setCHDisconnected={setCHDisconnected}
        showLoader={showLoader}
        setShowLoader={setShowLoader}
      />
      {!CHDisconnected && !showLoader && <Wrapper />}
    </div >
  );
}

export default App;