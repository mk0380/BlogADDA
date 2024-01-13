import React, { useEffect } from 'react'
import Aos from "aos";
import "aos/dist/aos.css";
import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    useEffect(() => {
        Aos.init();
      }, []);
  return (
    <div>
           <footer className="footer">
        <div className="logo" data-aos="fade-up" data-aos-delay="200" >
          <h1><span style={{color:"cyan",fontSize:"40px"}}>BlogADDA</span></h1>
        </div>
        <br />
        <div className='links-data' data-aos="fade-up" data-aos-delay="300">
            <Link to='/'>Home</Link>
            <Link to="/about" >About Us</Link>
        </div>
        <br />
        <hr data-aos="fade-up" data-aos-delay="300" />
        <br />
        <div className="links" style={{ color: "white" }}>
          <Link
            to="/"
            // target={"_blank"}
          >
            <i
              className="fa fa-instagram"
              data-aos="zoom-in"
              data-aos-delay="700"
            ></i>
          </Link>
          <Link to="/" 
          // target={"_blank"}
          >
            <i
              className="fa fa-facebook"
              data-aos="zoom-in"
              data-aos-delay="900"
            ></i>
          </Link>
          <Link
            to="/"
            // target={"_blank"}
          >
            <i
              className="fa fa-youtube"
              data-aos="zoom-in"
              data-aos-delay="1100"
            ></i>
          </Link>
          <Link
            to="/"
            // target={"_blank"}
          >
            <i
              className="fa fa-linkedin"
              data-aos="zoom-in"
              data-aos-delay="1300"
            ></i>
          </Link>
          <Link
            to="/"
            // target={"_blank"}
          >
            <i
              className="fa fa-twitter"
              data-aos="zoom-in"
              data-aos-delay="1500"
            ></i>
          </Link>
        </div>
        
        <br />
        <hr
          style={{ width: "100%" }}
          data-aos="fade-up"
          data-aos-delay="1500"
        />
        <p
          style={{
            width: "100%",
            margin: "15px auto",
            color: "white",
            "font-family": "'Montserrat', sans-serif",
          }}
          data-aos="fade-up"
          data-aos-delay="1700"
        >
          Copyright © 2022-23 All Rights Reserved by BlogADDA.
        </p>
      </footer>
    </div>
  )
}

export default Footer
