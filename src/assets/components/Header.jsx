import "../style/home.css"
import { DataContext } from "../../App.jsx"
import { useContext } from "react";


export default function Header() {
  const { isEdit, setIsEdit } = useContext(DataContext);
  
  function handleTheme() {
    setIsEdit((prev => !prev))

  }

  return(
    <header>
      <div className="logo">
        <img src="/img/logo.svg" alt="Logo" />
      </div>
      <label className="theme" >
        <input type="checkbox" onChange={handleTheme} />
        {isEdit ? <img src="/img/sun-icon.svg" alt="Moon Icon" />  : <img src="/img/moon-icon.svg" alt="Moon Icon" />  }
      </label>
      <img src="/img/user.png" alt="Avatar" />
    </header>

  )
}