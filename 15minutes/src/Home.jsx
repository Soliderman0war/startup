import Header from '/components/Header.jsx';

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="dropdown">
          <select>
            <option>Select</option>
            <option>Chess</option>
            <option>Juggling</option>
            <option>Future Options</option>
          </select>
        </div>
        <div className="activity-space">
          <p>Space for Activity to show (e.g., YouTube video, game, etc.)</p>
        </div>
        <div className="buttons">
          <button>Completed Activity</button>
          <button>Randomize</button>
          <button>Confirm Activity</button>
        </div>
      </div>
    </>
  );
};

export default Home;
