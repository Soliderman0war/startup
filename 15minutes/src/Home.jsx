import React, { Component } from "react";
import styles from "./Home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 900, // Initial timer in seconds (15 minutes)
      activityCount: 0, // Number of completed activities
      selectedActivity: null, // Randomly selected activity
    };
    this.intervalId = null;
    this.activities = ["Chess", "Juggling", "Future Options with Third Party"];
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Clean up interval when component unmounts
  }

  startTimer = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return { timer: prevState.timer - 1 };
        } else {
          clearInterval(this.intervalId); // Stop timer when it reaches 0
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

  handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * this.activities.length);
    const randomActivity = this.activities[randomIndex];
    this.setState({ selectedActivity: randomActivity });
  };

  handleConfirmActivity = () => {
    const { selectedActivity } = this.state;
    if (selectedActivity) {
      alert(`Activity "${selectedActivity}" confirmed! (API call simulated)`);
      this.setState({ selectedActivity: null });
    }
  };

  render() {
    const { timer, activityCount, selectedActivity } = this.state;

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
          <a href="/about" className={styles.navLink}>
            About
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

        <div className={styles.mainContent}>
          {selectedActivity ? (
            <div className={styles.selectedActivity}>
              <h2>{selectedActivity}</h2>
              <p>Confirm?</p>
              <button
                className={styles.button}
                onClick={this.handleConfirmActivity}
              >
                Confirm
              </button>
            </div>
          ) : (
            <p className={styles.activityPrompt}>
              Click "Randomize" to select an activity.
            </p>
          )}
          <div className={styles.buttons}>
            <button
              className={styles.button}
              onClick={this.handleCompleteActivity}
            >
              Completed Activity
            </button>
            <button className={styles.button} onClick={this.handleRandomize}>
              Randomize
            </button>
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
