import "./About.css";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-left">

        <h4>About College</h4>

        <h2>Yashoda Technical Campus</h2>

        <p>
          Yashoda Technical Campus, Satara is committed to
          providing quality technical education and creating
          skilled professionals through innovation,
          practical learning and industry collaboration.
        </p>

        <p>
          Our Alumni Portal helps students and alumni stay
          connected, explore career opportunities,
          participate in events and build a strong
          professional network.
        </p>

      </div>

      <div className="about-right">

        <div className="about-card">
          🎓 Quality Education
        </div>

        <div className="about-card">
          💼 Placement Support
        </div>

        <div className="about-card">
          🤝 Alumni Network
        </div>

        <div className="about-card">
          🚀 Career Growth
        </div>

      </div>

    </section>
  );
}

export default About;