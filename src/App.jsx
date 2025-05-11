import { useState, createContext, useEffect } from 'react'
import './assets/style/App.css'
import { getPage } from './Helper';
export const DataContext = createContext(null)

function App() {
  const [data, setData] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const page = getPage(url)

  useEffect(() => {
    window.addEventListener("hashchange", () => setUrl(location.hash.substring(1) || "/"));
  }, [])

  return (
    <>
      <DataContext.Provider value={{data, setData, setCurrentInvoice, currentInvoice, status, setStatus}}>
        {page.component}
      </DataContext.Provider>
    </>
  )
}

export default App
