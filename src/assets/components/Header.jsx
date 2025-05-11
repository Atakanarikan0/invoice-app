import "../style/Home.css"


export default function Header() {

  return(
    <header>
      <div className="logo">
        <img src="/public/img/logo.svg" alt="Logo" />
      </div>
      <label className="theme">
        <input type="checkbox" />
        <img src="/public/img/moon-icon.svg" alt="Moon Icon" />
      </label>
      <img src="/public/img/user.png" alt="Avatar" />
    </header>

  )
}