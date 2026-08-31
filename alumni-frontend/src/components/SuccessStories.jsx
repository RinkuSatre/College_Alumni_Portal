import { useEffect, useState } from "react";
import {ChevronLeft,ChevronRight,} from "react-bootstrap-icons";
import "./SuccessStories.css";

import alumni1 from "../assets/images/alumni1.jpg";
import alumni2 from "../assets/images/alumni2.jpg";
import alumni3 from "../assets/images/alumni3.jpg";
import alumni4 from "../assets/images/alumni4.jpg";
import alumni5 from "../assets/images/alumni5.jpg";
import alumni6 from "../assets/images/alumni6.jpg";
import alumni7 from "../assets/images/alumni7.jpg";

function SuccessStories() {

  const alumni = [

    {
      image: alumni1,
      name: "Onkar Rajendra Dige",
      company: "Infosys",
      role: "Senior Process Specialist",
    },

    {
      image: alumni2,
      name: "Rohan Rajendra Deshmukh",
      company: "TCS",
      role: "Associate System Engineer ",
    },

    {
      image: alumni3,
      name: "Niranjan Dhananjay Bhosale",
      company: "Infosys",
      role: "Process Executive",
    },

    {
      image: alumni4,
      name: "Suryawanshi Sangramsingh ",
      company: "Yiron Technology pvt. Ltd.",
      role: "Software Engineer",
    },

    {
      image: alumni5,
      name: "Aishwarya Prakash Sapkal ",
      company: "Acme Infovision pvt. Ltd. ",
      role: "Technical Support Executive ",
    },

    {
      image: alumni6,
      name: "Vaishnavi Narendra Parte",
      company: "TCS",
      role: "Process Associate",
    },

    {
      image: alumni7,
      name: "Shruti Rajesh Jadhav ",
      company: "Acme infovision Pvt. Ltd. satara .",
      role: "Support Executive",
    },

    

  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev >= alumni.length - 3) {
        return 0;
      }
       return prev + 1;
      });
    };

    const prevSlide = () => {
      setCurrent((prev) => {
        if (prev === 0) {
          return alumni.length - 3;
        }
        return prev - 1;
      });
    };

    useEffect(() => {

      const interval = setInterval(() => {

        setCurrent((prev) => {
            if (prev >= alumni.length - 3) {
              return 0;
            }
          return prev + 1;
         });

        }, 3000);

      return () => clearInterval(interval);

    }, []);

  return (

    <section className="success" id="success">

      <h2>Our Successful Alumni</h2>

      <p>
        Meet our proud alumni working in top companies.
      </p>

      < div className="carousel">

        <button className="arrow left" onClick={prevSlide}>
            <ChevronLeft />
        </button>

      

        <div className="carousel-wrapper">

            <div
                className="carousel-track"
                style={{
                   transform: `translateX(-${current * 33.33}%)`,
                }}
              >

                {alumni.map((item, index) => (

                 <div className="success-card" key={index}>

                   <img src={item.image} alt={item.name} />

                   <h3>{item.name}</h3>

                   <h4>{item.role}</h4>

                   <span>{item.company}</span>

                 </div>

                ))}

            </div> 

         </div>

          <button className="arrow right" onClick={nextSlide}>
            <ChevronRight />
          </button>

        </div>

        <div className="dots">

            {alumni.slice(0, alumni.length - 2).map((_, index) => (

                <span
                key={index}
                className={current === index ? "dot active" : "dot"}
                onClick={() => setCurrent(index)}
                ></span>

            ))}

        </div>
    </section>
   

  );
}

export default SuccessStories;

