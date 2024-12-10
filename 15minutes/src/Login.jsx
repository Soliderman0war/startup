import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 409) {
        setErrorMessage('Email already registered. Please log in.');
        return;
      }

      const result = await response.json();
      
      if (response.ok) {
        setErrorMessage("");
        alert("Logged in successfully!");
        navigate("/"); 
      } else {
        setErrorMessage(result.msg || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.welcomeMessage}>
          <h2>Welcome back! Log in to continue.</h2>
        </div>
      </footer>
    </div>
  );
};

export default Login;
