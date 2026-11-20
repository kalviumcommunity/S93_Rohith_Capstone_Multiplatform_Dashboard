const navigation = [
  { label: "Overview", href: "#overview", icon: "▦", active: true },
  { label: "Analytics", href: "#performance", icon: "↗" },
  { label: "Platforms", href: "#platforms", icon: "◎" },
  { label: "Accounts", href: "#accounts", icon: "♙" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview" aria-label="Socially home">
        <span className="brand-mark">S</span>
        <span className="brand-name">socially</span>
      </a>

      <p className="sidebar-label">WORKSPACE</p>
      <nav aria-label="Main navigation">
        {navigation.map((item) => (
          <a
            className={`sidebar-link${item.active ? " active" : ""}`}
            href={item.href}
            key={item.label}
            aria-current={item.active ? "page" : undefined}
          >
            <span className="sidebar-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <p className="workspace-label">Your workspace</p>
        <span className="workspace-name">Creator dashboard</span>
      </div>
    </aside>
  );
}

export default Sidebar;
