import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../Assets/logo/WHITE 1S.png";
import { Fade } from "react-awesome-reveal";

import "animate.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-lg">
            <Fade>
              <img src={Logo} alt="" className="logo h-16 w-auto" />
            </Fade>
          </div>
          <Fade>
            <ul className="flex space-x-4">
              <li className="text-white">
                {/* Use ternary operator to conditionally render Link or anchor tag */}
                {location.pathname === "/Projects" ? (
                  <a href="/">Home</a>
                ) : (
                  <a href="/#home">Home</a>
                )}
              </li>
              <li className="text-white">
                {/* Use ternary operator to conditionally render Link or anchor tag */}
                {location.pathname === "/Projects" ? (
                  <a href="/">About</a>
                ) : (
                  <a href="/#about">About</a>
                )}
              </li>
              <li className="text-white">
                {/* Use ternary operator to conditionally render Link or anchor tag */}
                {location.pathname === "/Projects" ? (
                  <a href="/">Work</a>
                ) : (
                  <a href="/#work">Work</a>
                )}
              </li>
              <li className="text-white">
                {/* Use ternary operator to conditionally render Link or anchor tag */}
                {location.pathname === "/Projects" ? (
                  <a href="/">Clients</a>
                ) : (
                  <a href="/#clients">Clients</a>
                )}
              </li>
            </ul>
            <a href="mailto:vanshdeepofficial@gmail.com">
              <button
                className="contact cursor-pointer inline-flex items-center rounded-full px-7 py-2 text-l text-white-200 
            hover:text-white border-2 border-white-600
            hover:bg-green-600 transition ease-in-out delay-150  hover:bg-green-600 duration-300  focus:bg-transparent"
                style={{ color: "white" }}
              >
                Contact Us
              </button>
            </a>
          </Fade>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
