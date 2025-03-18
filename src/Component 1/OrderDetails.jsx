"use client"

import { useState } from "react"
import { FaCalendarAlt, FaPlus, FaTrash } from "react-icons/fa"
import { IoInformationCircle } from "react-icons/io5"
import "../Component Css/orderdetails.css"
import { IoMdSave } from "react-icons/io"
import { RiSendPlaneLine } from "react-icons/ri"
import { GrUpdate } from "react-icons/gr"
import { RiIndeterminateCircleFill } from "react-icons/ri"
import { MdCancel } from "react-icons/md"

const OrderDetails = ({ username }) => {
  const [activeTab, setActiveTab] = useState("orderDetails")
  const [showDatePicker, setShowDatePicker] = useState(null)
  const [dates, setDates] = useState({
    bookedDate: "01-Aug-2024",
    startDate: "01-Jan-2024",
    activationDate: "01-Aug-2024",
    endDate: "31-Dec-2024",
  })

  // State for service line items
  const [serviceItems, setServiceItems] = useState([
    { id: 1, slNo: 1, serviceCode: "", serviceDescription: "", hsnCode: "", uom: "", qty: "", rate: "", amount: "" },
  ])

  // Function to toggle date picker
  const toggleDatePicker = (dateField) => {
    if (showDatePicker === dateField) {
      setShowDatePicker(null)
    } else {
      setShowDatePicker(dateField)
    }
  }

  // Function to handle date selection
  const handleDateSelect = (dateField, day, month, year) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const formattedDate = `${day.toString().padStart(2, "0")}-${months[month]}-${year}`

    setDates({
      ...dates,
      [dateField]: formattedDate,
    })

    setShowDatePicker(null)
  }

  // Simple date picker component
  const DatePicker = ({ dateField }) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Generate days for the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    // Generate months
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    return (
      <div className="date-picker">
        <div className="date-picker-header">
          <div className="month-year">
            {months[month]} {year}
          </div>
        </div>
        <div className="date-picker-days">
          {days.map((day) => (
            <div key={day} className="date-picker-day" onClick={() => handleDateSelect(dateField, day, month, year)}>
              {day}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Function to add a new service item
  const addServiceItem = () => {
    const newId = serviceItems.length > 0 ? Math.max(...serviceItems.map((item) => item.id)) + 1 : 1
    setServiceItems([
      ...serviceItems,
      {
        id: newId,
        slNo: serviceItems.length + 1,
        serviceCode: "",
        serviceDescription: "",
        hsnCode: "",
        uom: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ])
  }

  // Function to remove a service item
  const removeServiceItem = (id) => {
    if (serviceItems.length > 1) {
      const updatedItems = serviceItems.filter((item) => item.id !== id)
      // Update the serial numbers
      const reindexedItems = updatedItems.map((item, index) => ({
        ...item,
        slNo: index + 1,
      }))
      setServiceItems(reindexedItems)
    }
  }

  // Function to handle service item field changes
  const handleServiceItemChange = (id, field, value) => {
    const updatedItems = serviceItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // Calculate amount if both qty and rate are present
        if (field === "qty" || field === "rate") {
          const qty = field === "qty" ? Number.parseFloat(value) || 0 : Number.parseFloat(item.qty) || 0
          const rate = field === "rate" ? Number.parseFloat(value) || 0 : Number.parseFloat(item.rate) || 0
          updatedItem.amount = (qty * rate).toFixed(2)
        }

        return updatedItem
      }
      return item
    })
    setServiceItems(updatedItems)
  }

  return (
    <div className="amendments-view">
      <div className="amendments-header">
        <div className="amendments-title">
          <span className="order-id" style={{ color: "green", fontWeight: "bold" }}>
            BelleryInfoetch - 554411, Active
          </span>
          <IoInformationCircle className="info-icon" />
        </div>
        <div className="amendments-actions">
          <button>
            <RiIndeterminateCircleFill />
            Terminate
          </button>
          <button>
            <GrUpdate />
            Update
          </button>
          <button>
            <RiSendPlaneLine />
            Actions
          </button>
          <button className="save">
            <IoMdSave />
            Save
          </button>
          <button className="cancel">
            <MdCancel />
            Cancel
          </button>
        </div>
      </div>

      <div className="amendments-tabs">
        <div
          className={`amendments-tab ${activeTab === "orderDetails" ? "active" : ""}`}
          onClick={() => setActiveTab("orderDetails")}
        >
          Order Details
        </div>
        <div
          className={`amendments-tab ${activeTab === "customerContacts" ? "active" : ""}`}
          onClick={() => setActiveTab("customerContacts")}
        >
          Customer and Contacts
        </div>
        <div
          className={`amendments-tab ${activeTab === "billingDetails" ? "active" : ""}`}
          onClick={() => setActiveTab("billingDetails")}
        >
          Billing Details
        </div>
        <div className={`amendments-tab ${activeTab === "tax" ? "active" : ""}`} onClick={() => setActiveTab("tax")}>
          Tax
        </div>
        <div
          className={`amendments-tab ${activeTab === "revenue" ? "active" : ""}`}
          onClick={() => setActiveTab("revenue")}
        >
          Revenue
        </div>
      </div>

      {activeTab === "orderDetails" ? (
        <div className="amendments-form-container">
          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Order Number</div>
              <div className="form-input">
                <input type="text" placeholder="B-552-211" />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Business Unit</div>
              <div className="form-input">
                <select>
                  <option>USI Business Unit</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Order Type</div>
              <div className="form-input">
                <select>
                  <option>ONLY SELL</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Booked Date</div>
              <div className="form-input">
                <div className="date-input">
                  <input type="text" value={dates.bookedDate} readOnly />
                  <div className="calendar-icon" onClick={() => toggleDatePicker("bookedDate")}>
                    <FaCalendarAlt />
                  </div>
                  {showDatePicker === "bookedDate" && <DatePicker dateField="bookedDate" />}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Start Date</div>
              <div className="form-input">
                <div className="date-input">
                  <input type="text" value={dates.startDate} readOnly />
                  <div className="calendar-icon" onClick={() => toggleDatePicker("startDate")}>
                    <FaCalendarAlt />
                  </div>
                  {showDatePicker === "startDate" && <DatePicker dateField="startDate" />}
                </div>
              </div>
            </div>
          </div>

          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Category</div>
              <div className="form-input">
                <select>
                  <option>New</option>
                  <option>Previous</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Currency</div>
              <div className="form-input">
                <select>
                  <option>Rupee</option>
                  <option>Dollar</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Evergreen</div>
              <div className="form-input">
                <select>
                  <option>ONLY SELL</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Activation Date</div>
              <div className="form-input">
                <div className="date-input">
                  <input type="text" value={dates.activationDate} readOnly />
                  <div className="calendar-icon" onClick={() => toggleDatePicker("activationDate")}>
                    <FaCalendarAlt />
                  </div>
                  {showDatePicker === "activationDate" && <DatePicker dateField="activationDate" />}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">End Date</div>
              <div className="form-input">
                <div className="date-input">
                  <input type="text" value={dates.endDate} readOnly />
                  <div className="calendar-icon" onClick={() => toggleDatePicker("endDate")}>
                    <FaCalendarAlt />
                  </div>
                  {showDatePicker === "endDate" && <DatePicker dateField="endDate" />}
                </div>
              </div>
            </div>
          </div>

          {/* Service Line Items Table */}
          <div className="amendments-form-full-width">
            <div className="service-items-section">
              <div className="service-items-header">
                <h3>Service Line Items</h3>
                <button className="add-service-btn" onClick={addServiceItem}>
                  <FaPlus /> Add Service
                </button>
              </div>
              <div className="service-items-table-container">
                <table className="service-items-table">
                  <thead>
                    <tr>
                      <th>SL. NO.</th>
                      <th>Service Code</th>
                      <th>Service Description</th>
                      <th>SAC/HSN CODE</th>
                      <th>UOM</th>
                      <th>Qty</th>
                      <th>Rate/ Rs.</th>
                      <th>AMOUNT</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.slNo}</td>
                        <td>
                          <input
                            type="text"
                            value={item.serviceCode} placeholder="Service Code"
                            onChange={(e) => handleServiceItemChange(item.id, "serviceCode", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.serviceDescription} placeholder="Service Description"
                            onChange={(e) => handleServiceItemChange(item.id, "serviceDescription", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.hsnCode} placeholder="HSN code"
                            onChange={(e) => handleServiceItemChange(item.id, "hsnCode", e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            value={item.uom}
                            onChange={(e) => handleServiceItemChange(item.id, "uom", e.target.value)}
                          >
                            <option value="">Select</option>
                            <option value="PCS">PCS</option>
                            <option value="KG">KG</option>
                            <option value="LTR">LTR</option>
                            <option value="MTR">MTR</option>
                            <option value="BOX">BOX</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.qty} placeholder="Qty"
                            onChange={(e) => handleServiceItemChange(item.id, "qty", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={item.rate} placeholder="rate"
                            onChange={(e) => handleServiceItemChange(item.id, "rate", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={item.amount} placeholder="Amount"
                            onChange={(e) => handleServiceItemChange(item.id, "amount", e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            className="remove-item-btn"
                            onClick={() => removeServiceItem(item.id)}
                            disabled={serviceItems.length === 1}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="amendments-form-full-width">
            <div className="form-group">
              <div className="form-label">Order Description</div>
              <div className="form-input">
                <textarea
                  placeholder="Write your order Description Here"
                  style={{
                    width: "100%",
                    height: "150px",
                    resize: "none",
                    backgroundColor: "#f5f5f5",
                    color: "black",
                    fontWeight: "bold",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "customerContacts" ? (
        <div className="amendments-form-container">
          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Bill TO</div>
              <div className="form-input">
                <select>
                  <option>Bill To</option>
                  <option>Corporate</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Location</div>
              <div className="form-input">
                <select>
                  <option>Bill To</option>
                  <option>Corporate</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Contact</div>
              <div className="form-input">
                <select>
                  <option>Location</option>
                  <option>Corporate</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Payment Term</div>
              <div className="form-input">
                <select>
                  <option>Payment</option>
                  <option>Rupee</option>
                  <option>Dollar</option>
                </select>
              </div>
            </div>
          </div>

          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Sell To</div>
              <div className="form-input">
                <select>
                  <option>Location</option>
                  <option>Corporate</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Location</div>
              <div className="form-input">
                <select>
                  <option>Contact To</option>
                  <option>Corporate</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Contact</div>
              <div className="form-input">
                <select>
                  <option>Contact To</option>
                  <option>Corporate</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Payment Term</div>
              <div className="form-input">
                <select>
                  <option>Payment</option>
                  <option>Rupee</option>
                  <option>Dollar</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "billingDetails" ? (
        <div className="amendments-form-container">
          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Billing Channel</div>
              <div className="form-input">
                <select>
                  <option>Select Billing Channel</option>
                  <option>Email</option>
                  <option>Portal</option>
                  <option>Mail</option>
                  <option>EDI</option>
                </select>
              </div>
            </div>
          </div>

          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Billing Frequency</div>
              <div className="form-input">
                <select>
                  <option>Select Billing Frequency</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Semi-Annually</option>
                  <option>Annually</option>
                  <option>One-Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="amendments-form-full-width">
            <div className="form-group">
              <div className="form-label">Invoicing Rule</div>
              <div className="form-input">
                <select>
                  <option>Select Invoicing Rule</option>
                  <option>Advance</option>
                  <option>Arrears</option>
                  <option>Milestone</option>
                  <option>Consumption</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "tax" ? (
        <div className="amendments-form-container">
          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Tax Type</div>
              <div className="form-input">
                <select>
                  <option>Select Tax Type</option>
                  <option>GST</option>
                  <option>VAT</option>
                  <option>Sales Tax</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Tax Rate</div>
              <div className="form-input">
                <input type="text" placeholder="Enter Tax Rate" />
              </div>
            </div>
          </div>

          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Tax ID</div>
              <div className="form-input">
                <input type="text" placeholder="Enter Tax ID" />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Tax Exemption</div>
              <div className="form-input">
                <select>
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "revenue" ? (
        <div className="amendments-form-container">
          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Revenue Type</div>
              <div className="form-input">
                <select>
                  <option>Select Revenue Type</option>
                  <option>Recurring</option>
                  <option>One-Time</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Revenue Amount</div>
              <div className="form-input">
                <input type="text" placeholder="Enter Amount" />
              </div>
            </div>
          </div>

          <div className="amendments-form-column">
            <div className="form-group">
              <div className="form-label">Revenue Category</div>
              <div className="form-input">
                <select>
                  <option>Select Category</option>
                  <option>Product</option>
                  <option>Service</option>
                  <option>Subscription</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Revenue Date</div>
              <div className="form-input">
                <div className="date-input">
                  <input type="text" placeholder="Select Date" readOnly />
                  <div className="calendar-icon">
                    <FaCalendarAlt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="amendments-form-placeholder">
          <p>This tab is under development.</p>
        </div>
      )}
    </div>
  )
}

export default OrderDetails

