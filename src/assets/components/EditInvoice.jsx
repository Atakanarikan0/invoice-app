import Header from './Header.jsx';
import "../style/edit.css"
import { useContext, useState } from 'react';
import { DataContext } from '../../App.jsx';

export default function EditInvoice({closeModal}) {
  const { data, setData, setCurrentInvoice, currentInvoice, screenSize } = useContext(DataContext);
  const [formData, setFormData] = useState({ ...currentInvoice });

  // const [inputList, setInputList] = useState(() => {
  //   const items = Object.keys(currentInvoice)
  //     .filter(key => key.startsWith("itemName"))
  //     .map((_, i) => ({
  //       itemName: currentInvoice[`itemName${i + 1}`] || "",
  //       itemQty: currentInvoice[`itemQty${i + 1}`] || "",
  //       itemPrice: currentInvoice[`itemPrice${i + 1}`] || "",
  //     }));
  //   return items.length > 0 ? items : [{ itemName: '', itemQty: '', itemPrice: '' }];
  // });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    const item = updatedItems[index];
    item[field] = value;
    item["itemTotal"] = (item.itemQty * item.itemPrice).toFixed(2)
    setFormData({ ...formData, items: [...updatedItems] });
  };
  const addNewItem = () => {
    setFormData({ ...formData, items: [...formData.items, { id: formData.items.at(-1).id + 1, itemName: "", itemQty: "", itemPrice: "" }] });
    console.log(formData.items);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const editForm = new FormData(e.target);
    const editFormObj = Object.fromEntries(editForm);

    const newData = {
      id: currentInvoice.id,
      status: "Pending",
      ...editFormObj,
      items: [...formData.items]
    }

    const currentInvoiceIndex = data.findIndex(x => x.id === formData.id);
    data[currentInvoiceIndex] = newData;
    setData([...data])
    setCurrentInvoice(newData)


    closeModal();
    window.location.hash = "#/view-invoice";
  }


  const handleDeleteItem = (index) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
  };
  return (
    <div className='edit-container'>
      {screenSize ?
        <>
          <Header />
          <div className='go-back'>
            <button onClick={() => history.back()}>Go back</button>
          </div>

        </>
        : null}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className='new-invoice'>
          <h2>Edit <span>#</span>{formData.id}</h2>
          <span>Bill From</span>
          <div className='create-input-group'>
            <label>
              <span>Street Address</span>
              <input type="text" name={"billFromStreetAddress"} defaultValue={formData.billFromStreetAddress} />
            </label>
            <div className='input-flex'>
              <label>
                <span>City</span>
                <input type="text" name={"billFromCity"} defaultValue={formData.billFromCity} />
              </label>
              <label>
                <span>Post Code</span>
                <input type="text" name={"billFromPostCode"} defaultValue={formData.billFromPostCode} />
              </label>
              {screenSize ? "" : <label>
                <span>Country</span>
                <input type="text" name={"billFromCountry"} defaultValue={formData.billFromCountry} />
              </label>}
            </div>
            {screenSize ? <label>
              <span>Country</span>
              <input type="text" name={"billFromCountry"} defaultValue={formData.billFromCountry} />
            </label> : ""}

          </div>
          <span>Bill To</span>
          <div className='create-input-group'>
            <label>
              <span>Client’s Name</span>
              <input type="text" name={"clientName"} defaultValue={formData.clientName} />
            </label>
            <label>
              <span>Client’s Email</span>
              <input type="email" name={"clientEmail"} defaultValue={formData.clientEmail} />
            </label>
            <label>
              <span>Street Address</span>
              <input type="text" name={"clientStreetAddress"} defaultValue={formData.clientStreetAddress} />
            </label>
            <div className='input-flex'>
              <label>
                <span>City</span>
                <input type="text" name={"clientCity"} defaultValue={formData.clientCity} />
              </label>
              <label>
                <span>Post Code</span>
                <input type="text" name={"clientPostCode"} defaultValue={formData.clientPostCode} />
              </label>
              {screenSize ? "" : <label>
                <span>Country</span>
                <input type="text" name={"clientCountry"} defaultValue={formData.clientCountry} />
              </label>}
            </div>
            {screenSize ? <label>
              <span>Country</span>
              <input type="text" name={"clientCountry"} defaultValue={formData.clientCountry} />
            </label> : ""}
            {screenSize ?
              <>
                <label>
                  <span>Invoice Date</span>
                  <input type="text" readOnly className='edit-date' name={"invoiceDate"} defaultValue={formData.invoiceDate} />
                </label>
                <span>Payment Terms </span>
                <select name='pamentTerms' defaultValue={formData.pamentTerms}>
                  <option value="1 days">Net 1 Days</option>
                  <option value="7 days">Net 7 Days</option>
                  <option value="14 days">Net 14 Days</option>
                  <option value="30 days">Net 30 Days</option>
                </select>
              </> : <div className="input-flex  select-section">
                <label>
                  <span>Invoice Date</span>
                  <input type="text" readOnly className='edit-date' name={"invoiceDate"} defaultValue={formData.invoiceDate} />
                </label>
                <div>
                  <span>Payment Terms </span>
                  <select name='pamentTerms' defaultValue={formData.pamentTerms}>
                    <option value="1 days">Net 1 Days</option>
                    <option value="7 days">Net 7 Days</option>
                    <option value="14 days">Net 14 Days</option>
                    <option value="30 days">Net 30 Days</option>
                  </select>
                </div>
              </div>}
            <label>
              <span>Project Description</span>
              <input type="text" name={"projectDescription"} defaultValue={formData.projectDescription} />
            </label>
          </div>
          <h3>Item List</h3>
          {screenSize ?
            <div className="create-input-group">
              {formData.items.map((item, index) => (
                <div key={index} className="create-input-group">
                  <label>
                    <span>Item Name</span>
                    <input
                      type="text"
                      defaultValue={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Item Name"
                    />
                  </label>
                  <div className="input-grid">
                    <label>
                      <span>Qty.</span>
                      <input
                        type="text"
                        defaultValue={item.itemQty}
                        onChange={(e) => handleItemChange(index, 'itemQty', e.target.value)}
                        placeholder="1"
                      />
                    </label>
                    <label>
                      <span>Price</span>
                      <input
                        type="text"
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
                      <img src="/img/trash-icon.svg" alt="Delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            :
            <table className='item-table'>
              <thead>
                <tr>
                  <th style={{ width: '214px' }}>Item Name</th>
                  <th style={{ width: '46px' }}>Qty.</th>
                  <th style={{ width: '100px' }}>Price</th>
                  <th style={{ width: '56px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) =>
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        defaultValue={item.itemName}
                        onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                        placeholder="Item Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        defaultValue={item.itemQty}
                        onChange={(e) => handleItemChange(index, 'itemQty', e.target.value)}
                        placeholder="1"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.itemPrice}
                        onChange={(e) => handleItemChange(index, 'itemPrice', e.target.value)}
                        placeholder="0.00"
                      /></td>
                    <td>
                      <input
                        type='text'
                        value={item.itemTotal}
                        placeholder="0.00"
                        readOnly
                      /></td>
                    <td>
                      <button type="button" onClick={() => handleDeleteItem(index)}>
                        <img src="/img/trash-icon.svg" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }



          <button type='button' onClick={addNewItem}>+ Add New Item</button>
          <div className='gradient'></div>
        </div>
        <div className="btn-group">
          <button type='button' onClick={() => history.back()}>Cancel</button>
          <button>Save Changes</button>
        </div>
      </form>

    </div>
  )
}