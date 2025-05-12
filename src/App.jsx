import { useState, createContext, useEffect } from 'react'
import './assets/style/App.css'
import { getPage } from './Helper';
export const DataContext = createContext(null)

function App() {
  const [data, setData] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [screenSize, setScreenSize] = useState(window.innerWidth < 425);
  const [screenSizeValue, setScreenSizeValue] = useState(window.innerWidth);
  const [url, setUrl] = useState(location.hash.substring(1) || "/");
  const page = getPage(url)

  useEffect(() => {
    window.addEventListener("hashchange", () => setUrl(location.hash.substring(1) || "/"));
  }, [])
  useEffect(() => {
    window.addEventListener('resize', () => setScreenSize(window.innerWidth < 425))
    window.addEventListener('resize', () => setScreenSizeValue(window.innerWidth))
  }, [])

  console.log(screenSizeValue);

  return (
    <>
      <DataContext.Provider value={{data, setData, setCurrentInvoice, currentInvoice, status, setStatus, screenSize, screenSizeValue}}>
        {page.component}
      </DataContext.Provider>
    </>
  )
}

export default App
