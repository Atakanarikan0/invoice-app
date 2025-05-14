import { useState, createContext, useEffect } from 'react'
import './assets/style/App.css'
import { getPage } from './Helper';
export const DataContext = createContext(null)

function App() {
  const [data, setData] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [screenSize, setScreenSize] = useState(window.innerWidth < 445);
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const page = getPage(url)
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    const storedData = localStorage.getItem('invoiceData');
    if(storedData) {
      setData(JSON.parse(storedData));
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    window.addEventListener("hashchange", () => setUrl(location.hash.substring(1) || "/"));
  }, [])
  useEffect(() => {
    window.addEventListener('resize', () => setScreenSize(window.innerWidth < 445))
  }, [])


  return (
    <>
      <DataContext.Provider value={{data, setData, setCurrentInvoice, currentInvoice, status, setStatus, screenSize, isEdit, setIsEdit }}>
        {page.component}
      </DataContext.Provider>
    </>
  )
}

export default App
