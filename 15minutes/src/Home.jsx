import React, { Component } from "react";
import styles from "./Home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 900, 
      activityCount: 0, 
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); 
  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return { timer: prevState.timer - 1 };
        } else {
          clearInterval(this.intervalId); 
          return { timer: 0 };
        }
      });
    }, 1000);
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  handleCompleteActivity = () => {
    this.setState((prevState) => ({
      activityCount: prevState.activityCount + 1,
    }));
  };

  render() {
    const { timer, activityCount } = this.state;

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
            <label>Completed Activities: {activityCount}</label>
          </div>
          <div className={styles.timer}>
            <label>Timer: {this.formatTime(timer)}</label>
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
            <button
              className={styles.button}
              onClick={this.handleCompleteActivity}
            >
              Completed Activity
            </button>
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
            <a title="time icons">Time icons created by Freepik - Flaticon</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default Home;
