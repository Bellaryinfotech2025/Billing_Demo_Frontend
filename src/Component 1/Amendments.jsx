import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';
import '../Component Css/Amendments.css';
import { IoMdSave } from "react-icons/io";
import { RiSendPlaneLine } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { RiIndeterminateCircleFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const AmendmentsView = ({ username }) => {
  const [activeTab, setActiveTab] = useState('orderDetails');
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [dates, setDates] = useState({
    bookedDate: '01-Aug-2024',
    startDate: '01-Jan-2024',
    activationDate: '01-Aug-2024',
    endDate: '31-Dec-2024'
  });
  // Function to toggle date picker
  const toggleDatePicker = (dateField) => {
    if (showDatePicker === dateField) {
      setShowDatePicker(null);
    } else {
      setShowDatePicker(dateField);
    }
  };
  
  // Function to handle date selection
  const handleDateSelect = (dateField, day, month, year) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${day.toString().padStart(2, '0')}-${months[month]}-${year}`;
    
    setDates({
      ...dates,
      [dateField]: formattedDate
    });
    
    setShowDatePicker(null);
  };

  // Simple date picker component
  const DatePicker = ({ dateField }) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Generate days for the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Generate months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Add the missing return statement and closing brace
    return (
      <div className="date-picker">
        <div className="date-picker-header">
          <div className="month-year">
            {months[month]} {year}
          </div>
        </div>
        <div className="date-picker-days">
          {days.map(day => (
            <div 
              key={day} 
              className="date-picker-day"
              onClick={() => handleDateSelect(dateField, day, month, year)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="amendments-view">
      <div className="amendments-header">
        <div className="amendments-title">
          <span className="order-id" style={{color:'green',fontWeight:'bold'}}>BelleryInfoetch - 554411, Active</span>
          <IoInformationCircle className="info-icon" />
        </div>
        <div className="amendments-actions">
          <button> < RiIndeterminateCircleFill />Terminate</button>
          <button> <GrUpdate />Update</button>
          <button>  <RiSendPlaneLine />Actions</button>
          <button className="save"> <IoMdSave/>Save</button>
          <button className="cancel"> < MdCancel />Cancel</button>
        </div>
      </div>

      <div className="amendments-tabs">
        <div 
          className={`amendments-tab ${activeTab === 'orderDetails' ? 'active' : ''}`}
          onClick={() => setActiveTab('orderDetails')}
        >
          Order Details
        </div>
        <div 
          className={`amendments-tab ${activeTab === 'customerContacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('customerContacts')}
        >
          Customer and Contacts
        </div>
        <div 
          className={`amendments-tab ${activeTab === 'billingDetails' ? 'active' : ''}`}
          onClick={() => setActiveTab('billingDetails')}
        >
          Billing Details
        </div>
        <div 
          className={`amendments-tab ${activeTab === 'tax' ? 'active' : ''}`}
          onClick={() => setActiveTab('tax')}
        >
          Tax
        </div>
        <div 
          className={`amendments-tab ${activeTab === 'revenue' ? 'active' : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          Revenue
        </div>
      </div>
      
      {activeTab === 'orderDetails' ? (
        <div className="amendments-form">
          <div className="form-group">
            <div className="form-label">Order Number</div>
            <div className="form-input">
              <input type="text" placeholder="B-552-211"/>
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
            <div className="form-label">Booked Date</div>
            <div className="form-input">
              <div className="date-input">
                <input type="text" value={dates.bookedDate} readOnly />
                <div 
                  className="calendar-icon"
                  onClick={() => toggleDatePicker('bookedDate')}
                >
                  <FaCalendarAlt />
                </div>
                {showDatePicker === 'bookedDate' && (
                  <DatePicker dateField="bookedDate" />
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Start Date</div>
            <div className="form-input">
              <div className="date-input">
                <input type="text" value={dates.startDate} readOnly />
                <div 
                  className="calendar-icon"
                  onClick={() => toggleDatePicker('startDate')}
                >
                  <FaCalendarAlt />
                </div>
                {showDatePicker === 'startDate' && (
                  <DatePicker dateField="startDate" />
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Activation Date</div>
            <div className="form-input">
              <div className="date-input">
                <input type="text" value={dates.activationDate} readOnly />
                <div 
                  className="calendar-icon"
                  onClick={() => toggleDatePicker('activationDate')}
                >
                  <FaCalendarAlt />
                </div>
                {showDatePicker === 'activationDate' && (
                  <DatePicker dateField="activationDate" />
                )}
              </div>
            </div>
          </div>


          <div className="form-group">
            <div className="form-label">End Date</div>
            <div className="form-input">
              <div className="date-input">
                <input type="text" value={dates.endDate} readOnly />
                <div 
                  className="calendar-icon"
                  onClick={() => toggleDatePicker('endDate')}
                >
                  <FaCalendarAlt />
                </div>
                {showDatePicker === 'endDate' && (
                  <DatePicker dateField="endDate" />
                )}
              </div>
            </div>
          </div>


          <div className="form-group">
            <div className="form-label">Order Description</div>
            <div className="form-input">
              <textarea type="text" placeholder="Write your order Description Here" style={{width:'500px',height:'150px',resize:'none',backgroundColor:'#ccc',color:'black',fontWeight:'bold'}} />
            </div>
          </div>
        </div>
      ) : activeTab === 'customerContacts' ? (
        <div className="amendments-form">
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
            <div className="form-label">Sell TO</div>
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
            <div className="form-label">Loaction</div>
            <div className="form-input">
              <select>
              <option>Loaction</option>
                <option>Corporate</option>
                <option>Individual</option>
                <option>Government</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Loaction</div>
            <div className="form-input">
              <select>
              <option>Loaction</option>
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
            <div className="form-label">Contact</div>
            <div className="form-input">
              <select>
              <option>Conatct To</option>
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

          <div className="form-group">
            <div className="form-label">PaymentTerm</div>
            <div className="form-input">
              <select>
              <option>Payment</option>
                <option>Rupee</option>
                <option>Dollar</option>
                 
              </select>
            </div>
          </div>
        </div>
      ) : activeTab === 'billingDetails' ? (
        <div className="billing-containers">
          <div className="billing-container">
            <h3 className="billing-container-title">Billing Channel</h3>
            <div className="billing-container-content">
              <select className="billing-dropdown">
                <option>Select Billing Channel</option>
                <option>Email</option>
                <option>Portal</option>
                <option>Mail</option>
                <option>EDI</option>
              </select>
            </div>
          </div>
          
          <div className="billing-container">
            <h3 className="billing-container-title">Billing Frequency</h3>
            <div className="billing-container-content">
              <select className="billing-dropdown">
                <option>Select Billing Frequency</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Semi-Annually</option>
                <option>Annually</option>
                <option>One-Time</option>
              </select>
            </div>
          </div>
          
          <div className="billing-container">
            <h3 className="billing-container-title">Invoicing Rule</h3>
            <div className="billing-container-content">
              <select className="billing-dropdown">
                <option>Select Invoicing Rule</option>
                <option>Advance</option>
                <option>Arrears</option>
                <option>Milestone</option>
                <option>Consumption</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="amendments-form-placeholder">
          <p>This tab is under development.</p>
        </div>
      )}
    </div>
  );
};

export default AmendmentsView;

