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
      youtubeVideoLink: null,
      crosswordLink: null,
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
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  fetchVideo = async (query) => {
    const apiKey = "AIzaSyDIDlwzne_p68Rj_V_m1Nqg34iHA16nMUU";

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&type=video&key=${apiKey}`
      );

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0]?.id?.videoId;
        if (videoId) {
          this.setState({ youtubeVideoLink: `https://www.youtube.com/embed/${videoId}` });
        } else {
          console.error("No valid video ID found.");
        }
      }
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
  };

  handleRandomize = async () => {
    const activities = [
      { query: "Levy Rozman Beginner Chess Tutorial", type: "youtube" },
      { query: "Beginner's Guide to Juggling", type: "youtube" },
      { query: "Wall Street Journal Crossword", type: "crossword" },
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];

    if (randomActivity.type === "youtube") {
      await this.fetchVideo(randomActivity.query);
      this.setState({ currentActivity: randomActivity.query });
    }

    if (randomActivity.type === "crossword") {
      this.setState({
        crosswordLink: "https://www.wsj.com/crosswords",
        currentActivity: "Wall Street Journal Crossword",
      });
    }
  };

  handleCompleteActivity = () => {
    this.setState((prevState) => ({
      activityCount: prevState.activityCount + 1,
      activityLog: [...prevState.activityLog, this.state.currentActivity],
      currentActivity: null,
      youtubeVideoLink: null,
      crosswordLink: null,
    }));
  };

  handleConfirmActivity = () => {
    const previousLog = JSON.parse(localStorage.getItem("activityLog")) || [];
    const { currentActivity } = this.state;
  
    if (currentActivity) {
      const updatedActivityLog = [...previousLog, currentActivity];
      localStorage.setItem("activityLog", JSON.stringify(updatedActivityLog));
      this.setState({ activityLog: updatedActivityLog }); // Update state as well
      alert(`Activity confirmed: ${currentActivity}`);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload(); 
  };

  render() {
    const isLoggedIn = !!localStorage.getItem("authToken");
    const { timer, youtubeVideoLink, crosswordLink, activityCount, currentActivity } = this.state;

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <a href="/" className={styles.navLink}>
              Home
            </a>
            {!localStorage.getItem("authToken") && (
            <>
            <a href="/login" className={styles.navLink}>
             Login
            </a>
            <a href="/signup" className={styles.navLink}>
             Signup
            </a>
            </>
             )}

            {isLoggedIn && (
              <button className={styles.logoutButton} onClick={this.handleLogout}>
                Logout
              </button>
            )}
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
            {youtubeVideoLink && (
              <div className={styles.videoSection}>
                <iframe
                  width="560"
                  height="315"
                  src={youtubeVideoLink}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {crosswordLink && (
              <div className={styles.crosswordSection}>
                <a
                  href={crosswordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.crosswordLink}
                >
                  Go to Wall Street Journal Crossword
                </a>
              </div>
            )}

            <div className={styles.buttonSection}>
              <button
                className={styles.randomizeButton}
                onClick={this.handleRandomize}
              >
                Randomize Activity (Chess, Juggling, Crossword)
              </button>
              {currentActivity && (
                <div>
                  <p>Current Activity: {currentActivity}</p>
                  <button
                    className={styles.confirmButton}
                    onClick={this.handleConfirmActivity}
                  >
                    Confirm Activity
                  </button>
                </div>
              )}

              <button
                className={styles.button}
                onClick={this.handleCompleteActivity}
              >
                Completed Activity
              </button>
            </div>
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
            . Time icons created by Freepik - Flaticon.
          </p>
        </footer>
      </div>
    );
  }
}

export default Home;
