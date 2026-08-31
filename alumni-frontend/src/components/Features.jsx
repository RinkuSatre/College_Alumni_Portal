import "./Features.css";

function Features() {
  return (
    <section className="features" id="features">

      <h2>Why Join Our Alumni Portal?</h2>

      <div className="feature-grid">

        <div className="feature-box">
          <h3>🎓 Alumni Network</h3>
          <p>
            Connect with seniors and expand your
            professional network.
          </p>
        </div>

        <div className="feature-box">
          <h3>💼 Job Opportunities</h3>
          <p>
            Get internships and placement opportunities
            shared by alumni.
          </p>
        </div>

        <div className="feature-box">
          <h3>📅 College Events</h3>
          <p>
            Participate in reunions, workshops and alumni
            meets.
          </p>
        </div>

        <div className="feature-box">
          <h3>🏆 Reward Points</h3>
          <p>
            Earn reward points by helping students in the
            discussion forum.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;