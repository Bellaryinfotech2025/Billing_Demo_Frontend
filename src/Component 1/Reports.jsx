"use client"

import { useState, useRef, useEffect } from "react"
import "../Component Css/Report.css"
import { FaSave, FaTimes } from "react-icons/fa";

const ReportsView = () => {
  // State for date fields
  const [startDate, setStartDate] = useState("01-Jan-2024")
  const [endDate, setEndDate] = useState("31-Dec-2024")
  const [bookedDate, setBookedDate] = useState("")

  // State for showing date pickers
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [showBookedDatePicker, setShowBookedDatePicker] = useState(false)

  // Refs for date picker containers
  const startDatePickerRef = useRef(null)
  const endDatePickerRef = useRef(null)
  const bookedDatePickerRef = useRef(null)

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
    alert("Form data saved successfully!");
  };

  const handleCancel = () => {
    // Reset form or navigate back
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      // Reset form logic here
      setStartDate("01-Jan-2024");
      setEndDate("31-Dec-2024");
      setBookedDate("");
    }
  };

  return (
    <div className="reports-view">
      <div className="reports-tabs">
        <div className="tab active">Product Details</div>
        <div className="tab">Billing</div>
        <div className="tab">Tax</div>
        <div className="tab">Renewal</div>
        <div className="tab">Revenue</div>
        <div className="tab">event</div>
        <div className="tab">Goals</div>
        <div className="tab">Additional Info</div>
      </div>

      <div className="reports-content">
        <div className="form-row">
          <div className="form-label">Product</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
              </select>
            </div>
          </div>
          <div className="form-label right-label">Description</div>
          <div className="form-field description-field">
            <div className="description-box">Description</div>
          </div>
        </div>

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
              </select>
            </div>
          </div>
        </div>

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

        <div className="form-row">
          <div className="form-label">Evergreen</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
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
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">Line Type</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
              </select>
            </div>
          </div>
          <div className="form-label right-label">bookedDate</div>
          <div className="form-field">
            <div className="date-input" ref={bookedDatePickerRef}>
              <input
                type="text"
                value={bookedDate}
                placeholder="dd-mmm-yyyy"
                readOnly
                onClick={() => setShowBookedDatePicker(!showBookedDatePicker)}
              />
              <div className="calendar-icon" onClick={() => setShowBookedDatePicker(!showBookedDatePicker)}>
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                </svg>
              </div>
              {showBookedDatePicker && (
                <div className="date-picker">
                  {renderCalendar(bookedDate, (date) => handleDateSelect(date, setBookedDate, setShowBookedDatePicker))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">UOM Code</div>
          <div className="form-field">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>
                  Please Select
                </option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-label">Quantity</div>
          <div className="form-field">
            <input type="text" placeholder="Quantity" />
          </div>
        </div>
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

export default ReportsView
