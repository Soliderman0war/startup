import React, { Component } from "react";
import styles from "./Home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 900,
      activityCount: 0,
      currentActivity: null,
      activityLog: [],
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

  fetchChessTutorial = async () => {
    try {
      const response = await fetch("https://api.chess.com/pub/puzzle/random");
      
      console.log("API response status:", response.status);
      
      if (!response.ok) {
        throw new Error("Failed to fetch chess tutorial");
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data && data.name) {
        this.setState({ currentActivity: data.name });
      } else {
        console.error("No valid activity data found in response");
      }
    } catch (error) {
      console.error("Error fetching chess tutorial:", error);
    }
  };

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
      currentActivity: null, // Clear the current activity
    }));
  };

  handleRandomize = () => {
    console.log("Fetching chess tutorial...");
    this.fetchChessTutorial();
  };

  handleConfirmActivity = () => {
    const { currentActivity, activityLog } = this.state;
    if (currentActivity) {
      // Add the current activity to the log list
      const updatedLog = [...activityLog, currentActivity];
      this.setState({
        activityLog: updatedLog,
        currentActivity: null, // Clear the current activity
      });
    }
  };

  render() {
    const { timer, activityCount, currentActivity, activityLog } = this.state;

    return (
      <div className={styles.container}>
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
            <a href="/about" className={styles.navLink}>
              About
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
          
          <div className={styles.logSection}>
            <h3>Activity Log</h3>
            <ul>
              {activityLog.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
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
            . Time icons created by Freepik - Flaticon
          </p>
        </footer>
      </div>
    );
  }
}

export default Home;
