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
        <img src="/public/img/logo.svg" alt="Logo" />
      </div>
      <label className="theme" >
        <input type="checkbox" onChange={handleTheme} />
        {isEdit ? <img src="/public/img/sun-icon.svg" alt="Moon Icon" />  : <img src="/public/img/moon-icon.svg" alt="Moon Icon" />  }
      </label>
      <img src="/public/img/user.png" alt="Avatar" />
    </header>

  )
}