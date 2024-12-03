import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Logo</div>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>
            Home
          </a>
          <a href="/login" className={styles.navLink}>
            Login
          </a>
          <a href="/signup" className={styles.navLink}>
            Signup
          </a>
        </nav>
        <div className={styles.darkModeToggle}>
          <label htmlFor="darkMode">Dark Mode</label>
          <input type="checkbox" id="darkMode" />
        </div>
        <div className={styles.highestCount}>
          <label>highest-count from WebSocket Data</label>
        </div>
        <div className={styles.timer}>
          <label>TIMER</label>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.dropdown}>
          <select>
            <option>Select</option>
            <option>Chess</option>
            <option>Juggling</option>
            <option>Future Options with Third Party</option>
          </select>
        </div>
        <div className={styles.activitySpace}>
          <p>Space for Activity to show (e.g., YouTube video, game, etc.)</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.button}>Completed Activity</button>
          <button className={styles.button}>Randomize</button>
          <button className={styles.button}>Confirm Activity 3rd Party Caller</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>
          Check out the project on Drake Mueller's{" "}
          <a
            href="https://github.com/Soliderman0war/startup"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default Home;
