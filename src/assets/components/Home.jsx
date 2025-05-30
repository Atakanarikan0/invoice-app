import "../style/home.css"
import Header from "./Header.jsx"
import { DataContext } from "../../App.jsx"
import { useContext, useEffect, useState } from "react"
import CreateInvoice from "./CreateInvoice.jsx";


export default function Home() {
  const { data, setData, setCurrentInvoice, currentInvoice, screenSize, isEdit, setIsEdit } = useContext(DataContext);
  const [filterValue, setFilterValue] = useState('All');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  useEffect(() => {
    if (showCreateDialog) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showCreateDialog])

  function handleClick(id) {
    const current = (data.find(x => x.id === id))
    setCurrentInvoice(current);
    window.location.hash = "#/view-invoice"
  }

  const grandTotal = (total) => {
    let grandTotal = 0;
    total?.forEach(item => {
      grandTotal += Number(item);
    });
    return grandTotal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  function filterInvoice(filter) {
    setFilterValue(filter);
    // setData(data.find(x => x.status === filter))
  }
  const filteredData = data.filter(x => filterValue === "All" || x.status === filterValue);

  if(isEdit) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  return (
    <div className="home-container">
      <Header isEdit={isEdit} setIsEdit={setIsEdit} />

      <div className="input-group">
        <div>
          <h3>Invoices</h3>
          <span>
            {screenSize
              ? filteredData.length === 0
                ? 'No Invoices'
                : data.length !== 1
                  ? `${filteredData.length} invoices`
                  : `${filteredData.length} invoice`
              : filteredData.length === 0
                ? 'No invoices'
                : filteredData.length === 1
                  ? 'There is 1 total invoice'
                  : `There are ${filteredData.length} total invoices`}
          </span>
        </div>
        <select name="filter-box" value={filterValue} onChange={(e) => filterInvoice(e.target.value)}>
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
        </select>
        <button onClick={() => {
          if (screenSize) {
            window.location.hash = "#/create-invoice";
          } else {
            setShowCreateDialog(true)
          }
        }}>
          <img src="/img/plus-icon.svg" alt="" />
          <h6>{screenSize ? "New" : "New Invoice"}</h6>
        </button>
      </div>
      {!screenSize && showCreateDialog && (
        <div className="modal-overlay" onClick={() => setShowCreateDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CreateInvoice closeModal={() => setShowCreateDialog(false)} />
          </div>
        </div>
      )}
      {filteredData.length === 0 ?
        <div className="empty-invoice">
          <img src="/img/empty-invoice.png" alt="Empty Invoice" />
          <h5>There is nothing here</h5>
          <p>Create an invoice by clicking the <br /> New button and get started</p>
        </div>
        :
        <div className="card-group">
          {filteredData
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
                      <img src="/img/right-icon.svg" alt="Right Icon" />
                    </>)
                }
              </div>
            )}
        </div>
      }

    </div>
  )
}