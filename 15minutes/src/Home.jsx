import React, { Component } from "react";
import styles from "./Home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 900,
      activityCount: 0,
      currentActivity: null,
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  handleCompleteActivity = () => {
    this.setState((prevState) => ({
      activityCount: prevState.activityCount + 1,
    }));
  };

  handleRandomize = () => {
    const activities = ["Chess", "Juggling", "Meditation"];
    const randomActivity =
      activities[Math.floor(Math.random() * activities.length)];
    this.setState({ currentActivity: randomActivity });
  };

  handleConfirmActivity = () => {
    const { currentActivity } = this.state;
    if (currentActivity) {
      alert(`Confirmed activity: ${currentActivity}`);
      this.setState({ currentActivity: null });
    }
  };


  render() {
    const { timer, activityCount, currentActivity, isDarkMode } = this.state;

    return (
      <div className={isDarkMode ? styles.darkContainer : styles.container}>
        <header className={styles.header}>
          
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
          <div className={styles.highestCount}>
            <label>Completed Activities: {activityCount}</label>
          </div>
          <div className={styles.timer}>
            <label>Timer: {this.formatTime(timer)}</label>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.activitySection}>
            {currentActivity ? (
              <div className={styles.activityDisplay}>
                <p>Current Activity: {currentActivity}</p>
                <button
                  className={styles.confirmButton}
                  onClick={this.handleConfirmActivity}
                >
                  Confirm Activity
                </button>
              </div>
            ) : (
              <button
                className={styles.randomizeButton}
                onClick={this.handleRandomize}
              >
                Randomize Activity
              </button>
            )}
          </div>
          <div className={styles.buttonSection}>
            <button
              className={styles.button}
              onClick={this.handleCompleteActivity}
            >
              Completed Activity
            </button>
          </div>
        </main>

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
