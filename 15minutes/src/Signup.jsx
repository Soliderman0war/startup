import React, { useState } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('https://startup.15minutes.click/api/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Signup successful! Redirecting...");
        setErrorMessage("");
        setTimeout(() => navigate("/login"), 1000); 
      } else {
        setErrorMessage(result.msg || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Header />
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Sign up</h2>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
};

export default Signup;
