import React, { useState } from "react";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import Dashboard from "./Components/Dashboard";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  return (
    <>
      {!user ? (
        page === "login" ? (
          <LoginPage
            setUser={setUser}
            goToSignup={() => setPage("signup")}
          />
        ) : (
          <SignupPage goToLogin={() => setPage("login")} />
        )
      ) : (
        <Dashboard
          user={user}
          onLogout={() => {
            setUser(null);
            setPage("login");
          }}
        />
      )}
    </>
  );
}

export default App;