function Header({ darkMode, setDarkMode }) {

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

        <button>🔔</button>

        <button>👤 Admin</button>

      </div>
    </nav>
  );
}

export default Header;