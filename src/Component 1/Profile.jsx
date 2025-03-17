"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../Component Css/Welcome.css"
import '../Component Css/profile.css';
import {
  FaRegUserCircle,
  FaUser,
  FaSearch,
  FaCloudDownloadAlt,
  FaFileCsv,
  FaCog,
  FaSignOutAlt,
  FaArrowLeft,
} from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { MdOutlineDarkMode } from "react-icons/md"
import { IoIosNotificationsOutline } from "react-icons/io"
import { MdClose } from "react-icons/md"
import AmendmentsView from "../Component 1/Amendments"
import AIChatbot from "../Component 1/HomePage"

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false)
  const { username } = useParams()
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false)
  const [activeView, setActiveView] = useState("home") // Track active view
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileData, setProfileData] = useState({
    name: username || "John Doe",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, Country",
    company: "Acme Corporation",
    position: "Billing Manager",
    bio: "Experienced billing professional with 5+ years in financial management and billing software implementation.",
  })

  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  //logout to main page here
  const handleLogout = () => {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userData")
    navigate("/") //home page
  }

  // Handle navigation item clicks
  const handleNavClick = (view) => {
    setActiveView(view)
    setShowSettings(false)
    setShowUserDropdown(false)
  }

  // Handle profile navigation
  const handleProfileClick = () => {
    navigate("/profile")
  }

  // Handle settings navigation
  const handleSettingsClick = () => {
    toggleSettings()
    setShowUserDropdown(false)
  }

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle profile save
  const handleProfileSave = () => {
    // In a real app, you would save to a database here
    alert("Profile updated successfully!")
    // Navigate back to home
    handleNavClick("home")
  }

  // Render the appropriate view based on activeView state
  const renderView = () => {
    if (showSettings) {
      return (
        <div className="settings-container">
          <div className="settings-header">
            <h2>Settings</h2>
            <button className="close-button" onClick={toggleSettings}>
              <MdClose style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
          <div className="settings-content">
            <div className="settings-section">
              <h3> &nbsp;&nbsp;&nbsp;Manage Users&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
              <ul className="settings-list">
                <li>Users</li>
                <li>Profiles</li>
                <li>User Roles</li>
                <li>Assigned Roles</li>
              </ul>
            </div>
            <div className="settings-section">
              <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Master Data &nbsp;&nbsp;&nbsp;</h3>
              <ul className="settings-list">
                <li>Customers</li>
                <li>Products</li>
                <li>Product Catalogs</li>
                <li>Vendors</li>
              </ul>
            </div>
            <div className="settings-section">
              <h3> &nbsp;&nbsp;&nbsp;Manage Users&nbsp;&nbsp;&nbsp;</h3>
              <ul className="settings-list">
                <li>Users</li>
                <li>Profiles</li>
                <li>User Roles</li>
                <li>Assigned Roles</li>
              </ul>
            </div>
            <div className="settings-section">
              <h3> &nbsp;&nbsp;&nbsp;Manage Users&nbsp;&nbsp;&nbsp;</h3>
              <ul className="settings-list">
                <li>Users</li>
                <li>Profiles</li>
                <li>User Roles</li>
                <li>Assigned Roles</li>
              </ul>
            </div>
            <div className="settings-section">
              <h3> &nbsp;&nbsp;&nbsp;Manage Users&nbsp;&nbsp;&nbsp;</h3>
              <ul className="settings-list">
                <li>Users</li>
                <li>Profiles</li>
                <li>User Roles</li>
                <li>Assigned Roles</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

    switch (activeView) {
      case "home":
        return (
          <div className="dashboard-view home-view">
            <h1>Welcome to Bellary Billing Software</h1>
            <div className="dashboard-assistant">
              <h2>Your Billing Assistant</h2>
              <AIChatbot username={profileData.name} />
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="dashboard-view profile-view">
            <div className="profile-header-bar">
              <button className="back-btn" onClick={() => handleNavClick("home")}>
                <FaArrowLeft /> Back to Dashboard
              </button>
              <h1>User Profile</h1>
            </div>

            <div className="profile-container">
              <div className="profile-header">
                <div className="profile-image-container">
                  <div className="profile-image">
                    {profileImage ? (
                      <img src={profileImage || "/placeholder.svg"} alt="Profile" />
                    ) : (
                      <FaUser className="profile-icon" />
                    )}
                  </div>
                  <label className="change-photo-btn">
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                  </label>
                </div>
                <div className="profile-info">
                  <h2>{profileData.name}</h2>
                  <p>
                    {profileData.position} at {profileData.company}
                  </p>
                </div>
              </div>

              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={profileData.position}
                    onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button className="save-btn" onClick={handleProfileSave}>
                    Save Changes
                  </button>
                  <button className="cancel-btn" onClick={() => handleNavClick("home")}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "orders":
        return (
          <div className="dashboard-view orders-view">
            <div className="orders-header">
              <div className="orders-title">Order Search</div>
              <div className="orders-actions">
                <button className="add-order-btn">+ Add Order</button>
                <button className="export-btn">
                  {" "}
                  <FaCloudDownloadAlt /> Excel
                </button>
                <button className="export-btn">
                  <FaFileCsv />
                  CSV
                </button>
              </div>
            </div>

            <div className="search-box">
              <input type="text" className="search-input" placeholder="Search your order here..." />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
            <br />

            <table className="orders-table">
              <thead>
                <tr>
                  <th>Actions</th>
                  <th>Order Number</th>
                  <th>Order Type</th>
                  <th>Category</th>
                  <th>Bill To Customer</th>
                  <th>Deliver to Customer</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Monthly BF Total Value</th>
                  <th>Billed</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="14" className="no-records">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      case "amendments":
        return <AmendmentsView username={profileData.name} />

      default:
        return (
          <div className="dashboard-content">
            <h2 style={{ color: "maroon" }}>Dashboard Overview</h2>
          </div>
        )
    }
  }

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <header className="header">
        <div className="header-left">
          <div className="logo">Bellary Billing Software</div>
          <button className="back-button"></button>
          <nav className="main-nav">
            <ul>
              <li className="active">Dashboard</li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <button className="notification-btn">
            <IoIosNotificationsOutline style={{ width: "25px", height: "25px" }} />
          </button>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            <MdOutlineDarkMode style={{ width: "25px", height: "25px" }} />
          </button>
          <div className="settings-icon" onClick={toggleSettings}>
            <IoMdSettings style={{ width: "23px", height: "23px" }} />
          </div>{" "}
          &nbsp; &nbsp;
          <div className="user-profile-dropdown" ref={dropdownRef}>
            <div className="user-avatar" onClick={toggleUserDropdown}>
              {profileImage ? (
                <img src={profileImage || "/placeholder.svg"} alt="User" className="user-avatar-img" />
              ) : (
                <FaRegUserCircle style={{ width: "25px", height: "25px" }} />
              )}
            </div>
            {showUserDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <div className="dropdown-user-info">
                    <h4>{profileData.name}</h4>
                    <p>{profileData.email}</p>
                  </div>
                </div>
                <ul className="dropdown-list">
                  <li onClick={() => handleNavClick("profile")}>
                    <FaUser className="dropdown-icon" />
                    <span>Profile</span>
                  </li>
                  <li onClick={handleSettingsClick}>
                    <FaCog className="dropdown-icon" />
                    <span>Settings</span>
                  </li>
                  <li onClick={handleLogout}>
                    <FaSignOutAlt className="dropdown-icon" />
                    <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <h1 style={{ color: "#0a152f", fontWeight: "bold", fontFamily: "serif" }}>Welcome {profileData.name} </h1>
            <ul>
              <li className={activeView === "home" ? "active" : ""} onClick={() => handleNavClick("home")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                Home
              </li>
              <li className={activeView === "orders" ? "active" : ""} onClick={() => handleNavClick("orders")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1z" />
                </svg>
                Orders
              </li>
              <li className={activeView === "amendments" ? "active" : ""} onClick={() => handleNavClick("amendments")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                </svg>
                Amendments
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
                Usages
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V7H7z" />
                </svg>
                Billing
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                Reports
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
                Payments
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                Imports
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                </svg>
                Exports
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                </svg>
                Request
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                </svg>
                Previous Imports
              </li>
              <li>
                <button onClick={handleLogout} style={{ backgroundColor: "#0a152f" }}>
                  Signout from Dashboard
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="main-content">{renderView()}</main>
      </div>
    </div>
  )
}

export default Profiler;

