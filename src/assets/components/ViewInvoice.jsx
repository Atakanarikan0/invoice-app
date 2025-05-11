import Header from "./Header"
import '../style/view.css'
import { DataContext } from "../../App.jsx"
import { useContext, useRef } from "react"


export default function ViewInvoice() {
  const dialogRef = useRef(false)
  const { data, setData, setCurrentInvoice, currentInvoice } = useContext(DataContext);
  function handleDialog() {
    dialogRef.current.showModal();
  }
  function handleDelete(id) {
    setData(data.filter(x => x.id !== id));
    window.location.hash = "#/";
  }
  function handlePaid() {
    setCurrentInvoice({...currentInvoice, status: "Paid"});
  }
  return (
    <>
      <div className="view-container">
        <Header />
        <div className='go-back'>
          <button onClick={() => history.back()}>Go back</button>
        </div>
        <div className="status">
          <h5>Status</h5>
          <span className={currentInvoice.status === "Pending" ? "pending" : currentInvoice.status === "Paid"  ? "paid" :"draft"}>{currentInvoice.status}</span>
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
            {Object.keys(currentInvoice)
              .filter(key => key.startsWith("itemName"))
              .map(key => {
                const index = key.replace("itemName", "");
                const name = currentInvoice[`itemName${index}`];
                const qty = currentInvoice[`itemQty${index}`];
                const price = currentInvoice[`itemPrice${index}`];
                const total = currentInvoice[`itemTotal${index}`];

                return (
                  <div className="pay-group" key={index}>
                    <div>
                      <h3>{name}</h3>
                      <span>{qty} x £ {price}</span>
                    </div>
                    <h6>£ {parseFloat(total).toFixed(2)}</h6>
                  </div>
                );
              })
            }
          </div>
          <div className="grand-total">
            <h3>Grand Total</h3>
            <h2>£ {
              Object.keys(currentInvoice)
                .filter(key => key.startsWith('itemTotal'))
                .reduce((acc, key) => acc + parseFloat(currentInvoice[key] || 0), 0)
                .toFixed(2)
            }</h2>
          </div>
        </div>
        <div className="btn-group">
          <button onClick={() => window.location.hash = "#/edit-invoice"}>Edit</button>
          <button onClick={handleDialog}>Delete</button>
          <button onClick={handlePaid}>Mark as Paid</button>
        </div>
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