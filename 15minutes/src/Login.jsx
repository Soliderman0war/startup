import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigate("/");
    } else {
      setErrorMessage("Incorrect username or password.");
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/login" className={styles.navLink}>Login</a>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.button}>
            Login
          </button>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.welcomeMessage}>
          <h2>Welcome, <span id="display-username">{username || "FROM DATABASE"}</span>!</h2>
        </div>
      </footer>
    </div>
  );
};

export default Login;
