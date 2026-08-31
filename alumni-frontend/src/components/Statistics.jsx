import "./Statistics.css";

function Statistics() {
  return (
    <section className="statistics">

      <h2>Our Achievements</h2>

      <div className="stats-container">

        <div className="stat-card">
          <h1>1500+</h1>
          <p>Alumni</p>
        </div>

        <div className="stat-card">
          <h1>250+</h1>
          <p>Companies</p>
        </div>

        <div className="stat-card">
          <h1>120+</h1>
          <p>Jobs Posted</p>
        </div>

        <div className="stat-card">
          <h1>40+</h1>
          <p>Events</p>
        </div>

      </div>

    </section>
  );
}

export default Statistics;