const navItems = [
  { id: "overview", icon: "◈", label: "Overview" },
  { id: "methodology", icon: "⬡", label: "Methodology" },
  { id: "skills", icon: "◉", label: "Skills Analysis" },
  { id: "visualizations", icon: "▦", label: "Visualizations" },
  { id: "database", icon: "⬟", label: "DB & GitHub Setup" },
];

export default function Sidebar({ activePage, setActivePage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>SkillMap TH</h1>
        <p>Thai Job Market · 2018</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        JCSSE 2018<br />
        Chiang Mai University<br />
        IEEE Paper Dashboard

        <button
          onClick={onLogout}
          style={{
            marginTop: "15px",
            padding: "8px",
            background: "#ff4d4d",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}