function Navbar({ user, onLogout }) {
  const initials = (user?.name || "Creator")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="navbar">
      <div className="breadcrumb" aria-label="Breadcrumb">
        <span>Workspace</span>
        <span className="breadcrumb-separator" aria-hidden="true">
          /
        </span>
        <strong>Overview</strong>
      </div>

      <div className="topbar-user">
        <div className="user-avatar">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="" />
          ) : (
            initials
          )}
        </div>
        <div className="user-meta">
          <strong>{user?.name || "Creator"}</strong>
          <span>{user?.email || "Your workspace"}</span>
        </div>
        <button className="signout-button" onClick={onLogout} type="button">
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
