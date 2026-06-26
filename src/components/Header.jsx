import { useState } from "react";

function Header({ darkMode, setDarkMode }) {
  const [showNotification, setShowNotification] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo">CD</div>

        <div>
          <h3>Card Data</h3>
          <span>Management System</span>
        </div>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search contacts, company..."
        />
      </div>

      <div className="nav-actions">

        <button
          id="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div className="dropdown">
          <button
            onClick={() =>
              setShowNotification(!showNotification)
            }
          >
            🔔
          </button>

          {showNotification && (
            <div className="dropdown-menu">
              <h4>Notifications</h4>
              <p>✅ CSV imported successfully</p>
              <p>📊 Dashboard updated</p>
              <p>ℹ️ No new alerts</p>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button
            onClick={() =>
              setShowAdmin(!showAdmin)
            }
          >
            👤 Admin
          </button>

          {showAdmin && (
            <div className="dropdown-menu">
              <h4>Admin</h4>
              <p>👤 My Profile</p>
              <p>⚙️ Settings</p>
              <p>🚪 Logout</p>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Header;