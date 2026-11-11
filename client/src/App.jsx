
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import GoogleLoginPage from "./auth/GoogleLogin";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setCheckingAuth(false);
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
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
