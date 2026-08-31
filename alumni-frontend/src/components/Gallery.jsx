import "./Gallery.css";

import img1 from "../assets/images/gallery1.jpg";
import img2 from "../assets/images/gallery2.jpg";
import img3 from "../assets/images/gallery3.jpg";
import img4 from "../assets/images/gallery4.jpg";

function Gallery() {
  return (
    <section className="gallery" id="gallery">

      <h2>Campus Gallery</h2>

      <p>
        Explore the beautiful moments and infrastructure of
        Yashoda Technical Campus.
      </p>

      <div className="gallery-grid">

        <div className="gallery-item">
          <img src={img1} alt="Campus" />
        </div>

        <div className="gallery-item">
          <img src={img2} alt="Library" />
        </div>

        <div className="gallery-item">
          <img src={img3} alt="Event" />
        </div>

        <div className="gallery-item">
          <img src={img4} alt="Lab" />
        </div>

      </div>

    </section>
  );
}

export default Gallery;