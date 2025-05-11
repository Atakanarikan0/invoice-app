import "../style/Home.css"
import Header from "./Header.jsx"
import { DataContext } from "../../App.jsx"
import { useContext, useState } from "react"


export default function Home() {
  const { data, setData, setCurrentInvoice, currentInvoice } = useContext(DataContext);
  const [filterValue, setFilterValue] = useState('All');
  console.log(data);

  function handleClick(id) {
    const current = (data.find(x => x.id === id))
    setCurrentInvoice(current);
    window.location.hash = "#/view-invoice"
  }

  function filterInvoice(filter) {
    setFilterValue(filter);
    // setData(data.find(x => x.status === filter))
  }
  return (
    <div className="home-container">
      <Header />
      <div className="input-group">
        <div>
          <h3>Invoices</h3>
          <span>{data.length === 0 ? 'No Invoices' : data.length !== 1 ? `${data.length} invoices` : `${data.length} invoice`}</span>
        </div>
        <select name="filter-box" value={filterValue} onChange={(e) => filterInvoice(e.target.value)}>
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
        <button onClick={() => window.location.hash = "#/create-invoice"}>
          <img src="/public/img/plus-icon.svg" alt="" />
          <h6>New</h6>
        </button>
      </div>
      {data.length === 0 ?
        <div className="empty-invoice">
          <img src="/public/img/empty-invoice.png" alt="Empty Invoice" />
          <h5>There is nothing here</h5>
          <p>Create an invoice by clicking the <br /> New button and get started</p>
        </div>
        :
        <div className="card-group">
          {data
            .filter(x => filterValue === "All" || x.status === filterValue)
            .map(x =>
              <div className="card" key={x.id} onClick={() => handleClick(x.id)}>
                <div>
                  <h3><span>#</span>{x.id}</h3>
                  <h4>Due {x.invoiceDate}</h4>
                  <h5>£{
                    Object.keys(x)
                      .filter(key => key.startsWith('itemTotal'))
                      .reduce((acc, key) => acc + parseFloat(x[key] || 0), 0)
                      .toFixed(2)
                  }</h5>
                </div>
                <div>
                  <span>{x.clientName}</span>
                  <li className={x.status === "Pending" ? "pending" : x.status === "Paid"  ? "paid" :"draft"}>{x.status}</li>
                </div>
              </div>
            )}
        </div>
      }

    </div>
  )
}