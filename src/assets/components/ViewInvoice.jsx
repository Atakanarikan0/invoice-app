import Header from "./Header"
import '../style/view.css'
import { DataContext } from "../../App.jsx"
import { useContext, useRef, useState, useEffect } from "react"
import EditInvoice from "./EditInvoice.jsx"


export default function ViewInvoice() {
  const dialogRef = useRef(false)
  const { data, setData, setCurrentInvoice, currentInvoice, screenSize } = useContext(DataContext);
  const [showEditDialog, setShowEditDialog] = useState(false);
useEffect(() => {
  if(showEditDialog) {
    document.body.classList.add('modal-open');
  }else {
    document.body.classList.remove('modal-open');
  }
}, [showEditDialog])
  function handleDialog() {
    dialogRef.current.showModal();
  }

  const grandTotal = () => {
    let grandTotal = 0;
    currentInvoice.items?.map(item => {
      grandTotal += Number(item.itemTotal)
    });
    return grandTotal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  function handleDelete(id) {
    setData(data.filter(x => x.id !== id));
    window.location.hash = "#/";
  }
  function handlePaid() {
    const updatedInvoice = { ...currentInvoice, status: "Paid" };
    setCurrentInvoice(updatedInvoice);

    const uptadeStatus = data.map(x => x.id === updatedInvoice.id ? updatedInvoice : x)
    setData(uptadeStatus)

  }
  return (
    <>
      <div className="view-container">
        <Header />
        <div className='go-back'>
          <button onClick={() => window.location.hash = "#/"}>Go back</button>
        </div>
        {!screenSize && showEditDialog && (
          <div className="modal-overlay" onClick={() => setShowEditDialog(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <EditInvoice closeModal={() => setShowEditDialog(false)} />
            </div>
          </div>
        )}
        {screenSize ?
          <>
            <div className="status">
              <h5>Status</h5>
              <span className={currentInvoice.status === "Pending" ? "pending" : currentInvoice.status === "Paid" ? "paid" : "draft"}>{currentInvoice.status}</span>
            </div>
            <div className="payment-area">
              <div className="payment-desc">
                <h3><span>#</span>{currentInvoice.id}</h3>
                <h5>{currentInvoice.projectDescription}</h5>
              </div>
              <div className='payment-adress'>
                <h5>{currentInvoice.billFromStreetAddress}</h5>
                <h5>{currentInvoice.billFromCity}</h5>
                <h5>{currentInvoice.billFromPostCode}</h5>
                <h5>{currentInvoice.billFromCountry}</h5>
              </div>
              <div className="paymentbill">
                <div className="invoice-date">
                  <h5>Invoice Date</h5>
                  <h3>{currentInvoice.invoiceDate}</h3>
                </div>
                <div className="bill-info">
                  <h4>Bill To</h4>
                  <h3>{currentInvoice.clientName}</h3>
                  <h5>{currentInvoice.clientStreetAddress}</h5>
                  <h5>{currentInvoice.clientCity}</h5>
                  <h5>{currentInvoice.clientPostCode}</h5>
                  <h5>{currentInvoice.clientCountry}</h5>
                </div>
                <div className="payment-due">
                  <h5>Payment Due</h5>
                  <h3>20 Sep 2021</h3>
                </div>
                <div className="sent-to">
                  <h5>Sent to</h5>
                  <h3>{currentInvoice.clientEmail}</h3>
                </div>
              </div>
              <div className="payment">
                {currentInvoice.items.map(x =>
                (
                  <div className="pay-group" key={x.id}>
                    <div>
                      <h3>{x.itemName}</h3>
                      <span>{x.itemQty} x £ {x.itemPrice}</span>
                    </div>
                    <h6>£ {x.itemTotal}</h6>
                  </div>
                )
                )
                }
              </div>
              <div className="grand-total">
                <h3>Grand Total</h3>
                <h2>£ {grandTotal()

                  // Object.keys(currentInvoice.items.itemtotal)
                  //   .filter(key => key.startsWith('itemTotal'))
                  //   .reduce((acc, key) => acc + parseFloat(currentInvoice[key] || 0), 0)
                  //   .toFixed(2)
                }</h2>
              </div>
            </div>
            <div className="btn-group">
              <button onClick={() => window.location.hash = "#/edit-invoice"}>Edit</button>
              <button onClick={handleDialog}>Delete</button>
              <button onClick={handlePaid}>Mark as Paid</button>
            </div>
          </>
          :
          <>
            <div className="status">
              <h5>Status</h5>
              <span className={currentInvoice.status === "Pending" ? "pending" : currentInvoice.status === "Paid" ? "paid" : "draft"}>{currentInvoice.status}</span>
              <div className="btn-group">
                <button onClick={() => {
                  if (showEditDialog) {
                    window.location.hash = "#/edit-invoice"
                  } else {
                    setShowEditDialog(true)
                  }
                }}>Edit</button>
                <button onClick={handleDialog}>Delete</button>
                <button onClick={handlePaid}>Mark as Paid</button>
              </div>
            </div>
            <div className="payment-area">
              <div className="flex-1">
                <div className="payment-desc">
                  <h3><span>#</span>{currentInvoice.id}</h3>
                  <h5>{currentInvoice.projectDescription}</h5>
                </div>
                <div className='payment-adress'>
                  <h5>{currentInvoice.billFromStreetAddress}</h5>
                  <h5>{currentInvoice.billFromCity}</h5>
                  <h5>{currentInvoice.billFromPostCode}</h5>
                  <h5>{currentInvoice.billFromCountry}</h5>
                </div>
              </div>
              <div className="paymentbill">
                <div className="payment-group">
                  <div className="invoice-date">
                    <h5>Invoice Date</h5>
                    <h3>{currentInvoice.invoiceDate}</h3>
                  </div>
                  <div className="payment-due">
                    <h5>Payment Due</h5>
                    <h3>20 Sep 2026</h3>
                  </div>
                </div>
                <div className="bill-info">
                  <h4>Bill To</h4>
                  <h3>{currentInvoice.clientName}</h3>
                  <h5>{currentInvoice.clientStreetAddress}</h5>
                  <h5>{currentInvoice.clientCity}</h5>
                  <h5>{currentInvoice.clientPostCode}</h5>
                  <h5>{currentInvoice.clientCountry}</h5>
                </div>
                <div className="sent-to">
                  <h5>Sent to</h5>
                  <h3>{currentInvoice.clientEmail}</h3>
                </div>
              </div>
              <div className="payment">
                <table className="invoice-table" >
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th style={{ textAlign: "right" }}>Qty.</th>
                      <th style={{ textAlign: "right" }}>Price</th>
                      <th style={{ textAlign: "right" }}>Total</th>
                    </tr>
                  </thead>
                  {currentInvoice.items.map(x =>
                    <tbody>
                      <tr key={x.id}>
                        <td>{x.itemName}</td>
                        <td style={{ textAlign: "right" }}>{x.itemQty}</td>
                        <td style={{ textAlign: "right" }}>  £ {Number(x.itemPrice).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</td>
                        <td style={{ textAlign: "right" }}>  £ {Number(x.itemTotal).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}</td>
                      </tr>
                    </tbody>
                  )
                  }
                </table>
              </div>
              <div className="grand-total">
                <h3>{screenSize ? "Grand Total" : "Amount Due"}</h3>
                <h2>£ {grandTotal()

                  // Object.keys(currentInvoice.items.itemtotal)
                  //   .filter(key => key.startsWith('itemTotal'))
                  //   .reduce((acc, key) => acc + parseFloat(currentInvoice[key] || 0), 0)
                  //   .toFixed(2)
                }</h2>
              </div>
            </div>
          </>
        }
      </div>
      <dialog ref={dialogRef}>
        <h4>Confirm Deletion</h4>
        <p>Are you sure you want to delete invoice  {currentInvoice.id}? This action cannot be undone.</p>
        <div className="delete-btn">
          <button onClick={() => dialogRef.current.close()}>Cancel</button>
          <button onClick={() => handleDelete(currentInvoice.id)}>Delete</button>
        </div>
      </dialog>
    </>
  )
}