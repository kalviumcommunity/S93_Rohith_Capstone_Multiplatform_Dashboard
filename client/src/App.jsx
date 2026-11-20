
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import GoogleLoginPage from "./auth/GoogleLogin";
import { API_URL } from "./config/api";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(
    () => Boolean(localStorage.getItem("authToken"))
  );

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Session expired");
        }

        const data = await response.json();
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem("authToken");
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  if (checkingAuth) {
    return <p>Checking your session...</p>;
  }

  if (!user) {
    return <GoogleLoginPage onLogin={setUser} />;
  }

  return (
    <>
      <div className="auth-toolbar">
        <span>Welcome, {user.name}</span>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      <Dashboard />
    </>
  );
}

export default App;
