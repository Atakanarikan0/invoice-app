import "../style/Home.css"
import Header from "./Header.jsx"
import { DataContext } from "../../App.jsx"
import { useContext, useState } from "react"
import CreateInvoice from "./CreateInvoice.jsx";


export default function Home() {
  const { data, setData, setCurrentInvoice, currentInvoice, screenSize } = useContext(DataContext);
  const [filterValue, setFilterValue] = useState('All');
  console.log(screenSize);
  console.log(data);
  function handleClick(id) {
    const current = (data.find(x => x.id === id))
    setCurrentInvoice(current);
    window.location.hash = "#/view-invoice"
  }

  const grandTotal = (total) => {
    let grandTotal = 0;
    total?.map(item => {
      grandTotal += Number(item)
    });
    return grandTotal;
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
          <span>
            {screenSize
              ? data.length === 0
                ? 'No Invoices'
                : data.length !== 1
                  ? `${data.length} invoices`
                  : `${data.length} invoice`
              : data.length === 0
                ? 'No invoices'
                : data.length === 1
                  ? 'There is 1 total invoice'
                  : `There are ${data.length} total invoices`}
          </span>        </div>
        <select name="filter-box" value={filterValue} onChange={(e) => filterInvoice(e.target.value)}>
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
        <button onClick={() => window.location.hash = "#/create-invoice"}>
          <img src="/public/img/plus-icon.svg" alt="" />
          <h6>{screenSize ? "New" : "New Invoice"}</h6>
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
                {screenSize ? (
                  <>
                    <div>
                      <h3><span>#</span>{x.id}</h3>
                      <h4>Due {x.invoiceDate}</h4>
                      <h5>£{grandTotal(x.items.map(y => y.itemTotal))}</h5>
                    </div>
                    <div>
                      <span>{x.clientName}</span>
                      <li className={x.status === "Pending" ? "pending" : x.status === "Paid" ? "paid" : "draft"}>{x.status}</li>
                    </div>
                  </>)
                  : (
                    <>
                      <h3><span>#</span>{x.id}</h3>
                      <h4>Due {x.invoiceDate}</h4>
                      <span>{x.clientName}</span>
                      <h5>£{grandTotal(x.items.map(y => y.itemTotal))}</h5>
                      <li className={x.status === "Pending" ? "pending" : x.status === "Paid" ? "paid" : "draft"}>{x.status}</li>
                      <img src="/public/img/right-icon.svg" alt="Right Icon" />
                    </>)
                }
              </div>
            )}
        </div>
      }

    </div>
  )
}