import "./Contact.css";

function Contact() {

  return (

    <section id="contact" className="contact">

      <h2>Contact Us</h2>

      <p>
        We'd love to hear from you.
      </p>

      <div className="contact-container">

        <div className="contact-card">

          <h3>📍 Address</h3>

          <p>
            Yashoda Technical Campus,
            Wadhe, Satara,
            Maharashtra - 415011
          </p>

        </div>

        <div className="contact-card">

          <h3>📞 Phone</h3>

          <p>+91 9876543210</p>

        </div>

        <div className="contact-card">

          <h3>✉ Email</h3>

          <p>alumni@ytc.edu.in</p>

        </div>

      </div>

    </section>

  );

}

export default Contact;