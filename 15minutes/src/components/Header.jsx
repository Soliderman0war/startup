import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";


const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(styles.darkMode);
    } else {
      document.body.classList.remove(styles.darkMode);
    }
  }, [darkMode]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
      <img src="./clock.png"/>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
        <Link to="/login" className={styles.navLink}>
          Login
        </Link>
        <Link to="/signup" className={styles.navLink}>
          Signup
        </Link>
        <Link to="/about" className={styles.navLink}>
          About
        </Link>
      </nav>
      <div className={styles.darkModeToggle}>
        <label htmlFor="darkModeToggle">Dark Mode</label>
        <input
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={() => setDarkMode((prevMode) => !prevMode)}
        />
      </div>
    </header>
  );
};

export default Header;
