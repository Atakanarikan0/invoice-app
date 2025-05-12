import Header from './Header.jsx';
import "../style/create.css"
import { DataContext } from '../../App.jsx';
import { useContext, useState } from 'react';


export default function CreateInvoice() {
  const [inputList, setInputList] = useState([ { itemName: '', itemQty: '', itemPrice: '', itemTotal: '' },]);
  const { data, setData, status, setStatus } = useContext(DataContext);

  function generateSecureRandomId() {
    const randomString = 'XM' + crypto.getRandomValues(new Uint32Array(1))[0].toString(36).substring(0, 4).toUpperCase();
    return `${randomString}`;
  }
  function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    }); 
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...inputList];
    const item = updatedItems[index];
    item[field] = value;
    item["itemTotal"] = (item.itemQty * item.itemPrice).toFixed(2)
    setInputList(updatedItems);
  };

  function addNewInput(e) {
    e.preventDefault()
    setInputList([...inputList, { itemName: '', itemQty: '', itemPrice: '', itemTotal: '' }]);

  }
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.invoiceDate = formatDate(formObj.invoiceDate);
    formObj.status = status;
    const itemData = inputList.map((item, index) => {
     return {id: index + 1, ...item}
    }
  )
    const myData = {
      id: generateSecureRandomId(),
      ...formObj,
      items: [...itemData]
    };
    console.log(myData);
    setData([...data, myData]);
    console.log(data);
     window.history.back() 
  }
  function handleDeleteItem(index) {
    setInputList(inputList.filter((_,i) => i !== index))
  }
  return (
    <div className="create-contianer">
      <Header />
      <div className='go-back'>
        <button onClick={() => history.back()}>Go back</button>
      </div>
      <form  autoComplete="off" onSubmit={handleSubmit} onKeyDown={(e) => {
        if(e.key === 'Enter') {
          e.preventDefault();
        }
      }}>
        <div className='new-invoice'>
          <h2>New Invoice</h2>
          <span>Bill From</span>
          <div className='create-input-group'>
            <label>
              <span>Street Address</span>
              <input required type="text" name={"billFromStreetAddress"} placeholder='19 Union Terrace' />
            </label>
            <div className='input-flex'>
              <label>
                <span>City</span>
                <input required type="text"  name={"billFromCity"} placeholder='London' />
              </label>
              <label>
                <span>Post Code</span>
                <input required type="text" name={"billFromPostCode"} placeholder='E1 3EZ' />
              </label>
            </div>
            <label>
              <span>Country</span>
              <input required type="text" name={"billFromCountry"} placeholder='United Kingdom' />
            </label>
          </div>
          <span>Bill To</span>
          <div className='create-input-group'>
            <label>
              <span>Client’s Name</span>
              <input required type="text" name={"clientName"} placeholder='Alex Grim' />
            </label>
            <label>
              <span>Client’s Email</span>
              <input required type="email" name={"clientEmail"} placeholder='alexgrim@mail.com' />
            </label>
            <label>
              <span>Street Address</span>
              <input required type="text" name={"clientStreetAddress"} placeholder='84 Church Way' />
            </label>
            <div className='input-flex'>
              <label>
                <span>City</span>
                <input required type="text" name={"clientCity"} placeholder='Bradford' />
              </label>
              <label>
                <span>Post Code</span>
                <input required type="text" name={"clientPostCode"} placeholder='BD1 9PB' />
              </label>
            </div>
            <label>
              <span>Country</span>
              <input required type="text" name={"clientCountry"} placeholder='United Kingdom' />
            </label>
            <label>
              <span>Invoice Date</span>
              <input required type="date" name={"invoiceDate"} />
            </label>
            <span>Payment Terms </span> 
            <select name='pamentTerms' >
              <option value="1 days">Net 1 Days</option>
              <option value="7 days">Net 7 Days</option>
              <option value="14 days">Net 14 Days</option>
              <option value="30 days">Net 30 Days</option>
            </select>
            <label>
              <span>Project Description</span>
              <input required type="text" name={"projectDescription"} placeholder='Graphic Design' />
            </label>
          </div>
          <h3>Item List</h3>
          <div className='create-input-group'>
          {inputList.map((item, index) => (
            <div key={index} className="create-input-group">
              <label>
                <span>Item Name</span>
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                  placeholder="Banner Design"
                />
              </label>
              <div className="input-grid">
                <label>
                  <span>Qty.</span>
                  <input
                    type="text"
                    required
                    value={item.itemQty}
                    onChange={(e) => handleItemChange(index, 'itemQty', e.target.value)}
                    placeholder="1"
                  />
                </label>
                <label>
                  <span>Price</span>
                  <input
                    type="text"
                    required
                    value={item.itemPrice}
                    onChange={(e) => handleItemChange(index, 'itemPrice', e.target.value)}
                    placeholder="0.00"
                  />
                </label>
                <div className="total">
                  <span>Total</span>
                  <input 
                    type='text'
                    value={item.itemTotal}
                    placeholder="0.00"
                    readOnly
                     />
                </div>
                <button type="button" onClick={() => handleDeleteItem(index)}>
                  <img src="/public/img/trash-icon.svg" alt="Delete" />
                </button>
              </div>
            </div>
          ))}
          </div>

          <button type='button' onClick={addNewInput}>+ Add New Item</button>
          <div className='gradient'></div>
        </div>
        <div className="btn-group">
          <button type="button" onClick={() => window.history.back()}>Discard</button>
          <button className='draft-btn' type='submit' onClick={() => setStatus("Draft")}>Save as Draft</button>
          <button type='submit' onClick={() => setStatus("Pending")}>Save & Send</button>
        </div>
      </form>
    </div>
  )
}