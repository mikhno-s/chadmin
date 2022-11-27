import { useState, useEffect } from 'react';
import './App.css';
import Configurator from './components/configurator/Configurator'

function App() {
  const [URL, setChURL] = useState("")

  // useEffect(() => {
  //   console.log(URL)
  // }, [URL])

  return (
    <div className="App">
      <header className="App-header">
        < Configurator chURL={URL} setChURL={setChURL} />
      </header>
    </div>
  );
}

export default App;
