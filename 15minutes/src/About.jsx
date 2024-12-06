import React from "react";
import styles from "./About.module.css";
import Header from "./components/Header";
const About = () => {
  return (
    <div className={styles.container}>
      <Header />
        <h1>About 15Minutes</h1>
      <main className={styles.main}>
        <p>
          Many people in their lives want to change or improve. However, they
          don't know how to start or sometimes even what to start on. 
          I am proposing to create a website that selects an activity to do in
          15 minutes to improve slightly each day. People can sign in and
          utilize it as they keep track of what they improved on, as well as
          select an activity again to improve further.
          If they are unsure what to do, they can use the random option to get
          one selected for them.
        </p>
      </main>
    </div>
  );
};

export default About;
