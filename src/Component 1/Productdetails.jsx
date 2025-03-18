"use client"

import { useState, useRef, useEffect } from "react"
import "../Component Css/Report.css"
import { FaSave, FaTimes } from "react-icons/fa"

const ProductDetails = () => {
  // State for date fields
  const [startDate, setStartDate] = useState("01-Jan-2024")
  const [endDate, setEndDate] = useState("31-Dec-2024")
  const [bookedDate, setBookedDate] = useState("")

  // State for showing date pickers
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [showBookedDatePicker, setShowBookedDatePicker] = useState(false)

  // State for form fields
  const [productCode, setProductCode] = useState("")
  const [productName, setProductName] = useState("")
  const [category, setCategory] = useState("")
  const [isExistingCategory, setIsExistingCategory] = useState(false)
  const [existingCategories, setExistingCategories] = useState(["Electronics", "Clothing", "Food", "Furniture", "Toys"])
  const [hsnCode, setHsnCode] = useState("")
  const [rateUom1, setRateUom1] = useState("")
  const [rateUom2, setRateUom2] = useState("")

  // Refs for date picker containers
  const startDatePickerRef = useRef(null)
  const endDatePickerRef = useRef(null)
  const bookedDatePickerRef = useRef(null)

  // UOM options
  const uomOptions = [
    { value: "", label: "Please Select", disabled: true },
    { value: "PCS", label: "Pieces (PCS)" },
    { value: "KG", label: "Kilograms (KG)" },
    { value: "LTR", label: "Liters (LTR)" },
    { value: "MTR", label: "Meters (MTR)" },
    { value: "BOX", label: "Box (BOX)" },
    { value: "DOZ", label: "Dozen (DOZ)" },
    { value: "UNIT", label: "Unit (UNIT)" },
    { value: "SET", label: "Set (SET)" },
  ]

  // Close date pickers when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (startDatePickerRef.current && !startDatePickerRef.current.contains(event.target)) {
        setShowStartDatePicker(false)
      }
      if (endDatePickerRef.current && !endDatePickerRef.current.contains(event.target)) {
        setShowEndDatePicker(false)
      }
      if (bookedDatePickerRef.current && !bookedDatePickerRef.current.contains(event.target)) {
        setShowBookedDatePicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Format date to dd-MMM-yyyy
  const formatDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day = date.getDate().toString().padStart(2, "0")
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  // Handle date selection
  const handleDateSelect = (date, setDate, setShowPicker) => {
    setDate(formatDate(date))
    setShowPicker(false)
  }

  // Generate calendar for date picker
  const renderCalendar = (selectedDate, onDateSelect) => {
    const date = selectedDate ? new Date(parseDate(selectedDate)) : new Date()
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

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

    // Generate days for the calendar
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      days.push(
        <div key={`day-${i}`} className="calendar-day" onClick={() => onDateSelect(currentDate)}>
          {i}
        </div>,
      )
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => onDateSelect(new Date(year, month - 1, 1))}>◀</button>
          <div>
            {months[month]} {year}
          </div>
          <button onClick={() => onDateSelect(new Date(year, month + 1, 1))}>▶</button>
        </div>
        <div className="calendar-days">
          <div className="weekday">Su</div>
          <div className="weekday">Mo</div>
          <div className="weekday">Tu</div>
          <div className="weekday">We</div>
          <div className="weekday">Th</div>
          <div className="weekday">Fr</div>
          <div className="weekday">Sa</div>
          {days}
        </div>
      </div>
    )
  }

  // Parse date string to Date object
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date()

    const parts = dateStr.split("-")
    if (parts.length !== 3) return new Date()

    const day = Number.parseInt(parts[0], 10)
    const monthStr = parts[1]
    const year = Number.parseInt(parts[2], 10)

    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 }

    const month = months[monthStr]

    return new Date(year, month, day)
  }

  const handleSave = () => {
    alert("Product details saved successfully!")
  }

  const handleCancel = () => {
    // Reset form or navigate back
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      // Reset form logic here
      setStartDate("01-Jan-2024")
      setEndDate("31-Dec-2024")
      setBookedDate("")
      setProductCode("")
      setProductName("")
      setCategory("")
      setHsnCode("")
      setRateUom1("")
      setRateUom2("")
    }
  }

  // Check if category exists
  const checkCategoryExists = (value) => {
    setCategory(value)
    setIsExistingCategory(existingCategories.includes(value))
  }

  return (
    <div className="reports-view">
      <div className="reports-tabs">
        <div className="tab active">Product Details</div>
        <div className="tab">Additional Info</div>
      </div>

      <div className="reports-content">
        {/* Product Code and Name */}
        <div className="form-row">
          <div className="form-label">Product Code</div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Enter Product Code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>
          <div className="form-label right-label">Product Name</div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        </div>

        {/* UOM and Alternate UOM */}
        <div className="form-row">
          <div className="form-label">Product UOM</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                {uomOptions.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-label right-label">Alternate UOM</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                {uomOptions.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category and HSN Code */}
        <div className="form-row">
          <div className="form-label">Category</div>
          <div className="form-field">
            {isExistingCategory ? (
              <div className="select-wrapper">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="" disabled>
                    Please Select
                  </option>
                  {existingCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => checkCategoryExists(e.target.value)}
              />
            )}
          </div>
          <div className="form-label right-label">HSN Code</div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Enter HSN Code"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
            />
          </div>
        </div>

        {/* Rate per UOM */}
        <div className="form-row">
          <div className="form-label">Rate (per UOM-1)</div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Enter Rate"
              value={rateUom1}
              onChange={(e) => setRateUom1(e.target.value)}
            />
          </div>
          <div className="form-label right-label">Rate (per UOM-2)</div>
          <div className="form-field">
            <input
              type="text"
              placeholder="Enter Rate"
              value={rateUom2}
              onChange={(e) => setRateUom2(e.target.value)}
            />
          </div>
        </div>

        {/* Start Date and Intent */}
        <div className="form-row">
          <div className="form-label">Start Date</div>
          <div className="form-field">
            <div className="date-input" ref={startDatePickerRef}>
              <input
                type="text"
                value={startDate}
                readOnly
                onClick={() => setShowStartDatePicker(!showStartDatePicker)}
              />
              <div className="calendar-icon" onClick={() => setShowStartDatePicker(!showStartDatePicker)}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              {showStartDatePicker && (
                <div className="date-picker">
                  {renderCalendar(startDate, (date) => handleDateSelect(date, setStartDate, setShowStartDatePicker))}
                </div>
              )}
            </div>
          </div>
          <div className="form-label right-label">Intent</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="Sell">
                <option value="Sell">Sell</option>
                <option value="Buy">Buy</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
        </div>

        {/* End Date and JIO Number */}
        <div className="form-row">
          <div className="form-label">End Date</div>
          <div className="form-field">
            <div className="date-input" ref={endDatePickerRef}>
              <input type="text" value={endDate} readOnly onClick={() => setShowEndDatePicker(!showEndDatePicker)} />
              <div className="calendar-icon" onClick={() => setShowEndDatePicker(!showEndDatePicker)}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              {showEndDatePicker && (
                <div className="date-picker">
                  {renderCalendar(endDate, (date) => handleDateSelect(date, setEndDate, setShowEndDatePicker))}
                </div>
              )}
            </div>
          </div>
          <div className="form-label right-label">JIO Number</div>
          <div className="form-field">
            <input type="text" placeholder="JIO Number" />
          </div>
        </div>

        {/* Evergreen and Fulfillment Channel */}
        <div className="form-row">
          <div className="form-label">Evergreen</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="form-label right-label">Fulfillment Channel</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
                <option value="Direct">Direct</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Distributor">Distributor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Line Type and Quantity */}
        <div className="form-row">
          <div className="form-label">Line Type</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>
          </div>
          <div className="form-label right-label">Quantity</div>
          <div className="form-field">
            <input type="text" placeholder="Enter Quantity" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>
            <FaSave /> Save
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

