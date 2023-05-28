import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import {  HiOutlineMoon } from "react-icons/hi";
import {  FiSun } from "react-icons/fi";
import "./navBar.css";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const svgStyle = {
    marginRight: "12px",
    marginLeft: "15px",
  };

  return (
    <div className={`navbar-${theme}`} id="NavBar">
      <div className="mainSide">
        <svg
          width="40"
          height="40"
          viewBox="0 0 36 36"
          fill="none"
          style={svgStyle}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="18" fill="#4FA6A9" />
          <path
            d="M13.2533 27.7465L13.3647 28L13.5978 27.8508C16.7612 25.8243 23.3733 21.6122 24.5786 20.9336C25.3214 20.5154 25.5777 20.0054 25.57 19.5436C25.5663 19.3231 25.502 19.1306 25.4241 18.9855C25.3852 18.9128 25.3412 18.849 25.2966 18.7973C25.2596 18.7545 25.2114 18.7072 25.1547 18.6748L20.429 15.4564L18.2118 17.1066L18.4302 17.3002C18.993 17.7991 20.3613 18.8285 21.0144 19.2644C21.2755 19.4386 21.3254 19.5661 21.3311 19.6137C21.3348 19.6451 21.3233 19.6818 21.2656 19.7146C20.0553 20.4035 18.1772 21.5085 16.5481 22.5611C15.7341 23.0871 14.9784 23.6024 14.3984 24.0475C14.1087 24.2699 13.859 24.4776 13.6666 24.6625C13.4808 24.8412 13.3256 25.0198 13.2533 25.1842C12.8004 26.2143 13.0635 27.3149 13.2533 27.7465Z"
            fill="#1A3B54"
          />
          <path
            d="M22.3169 8.25353L22.2054 8L21.9723 8.14931C18.8089 10.1758 12.1968 14.3878 10.9916 15.0664C10.2487 15.4846 9.99244 15.9946 10.0002 16.4564C10.0039 16.6769 10.0682 16.8694 10.146 17.0146C10.185 17.0873 10.2289 17.151 10.2735 17.2027C10.3105 17.2456 10.3588 17.2928 10.4154 17.3252L15.1412 20.5437L17.3583 18.8935L17.14 18.6999C16.5772 18.2009 15.2089 17.1715 14.5557 16.7357C14.2946 16.5614 14.2447 16.4339 14.239 16.3863C14.2353 16.3549 14.2468 16.3183 14.3045 16.2854C15.5148 15.5966 17.3929 14.4915 19.022 13.439C19.8361 12.913 20.5917 12.3977 21.1717 11.9526C21.4615 11.7302 21.7112 11.5225 21.9035 11.3375C22.0893 11.1588 22.2446 10.9803 22.3169 10.8158C22.7697 9.78568 22.5066 8.68517 22.3169 8.25353Z"
            fill="white"
          />
        </svg>
        <h2
          className="titleMain"
          style={{ color: theme === "light" ? "inherit" : "#08436c" }}
        >
          Senior.az
        </h2>
      </div>

      <div className="buttons">
        <label className={`switch ${theme}`}>
          <input type="checkbox" onChange={() => toggleTheme(theme)} />
          <span className="slider round">
            <div
              className="parent"
              style={{ backgroundColor: theme === "light" ? "#333" : "" }}
            >
              <p
                id="iconSun"
                className={`toggle-icon ${theme === "dark" ? "active" : ""}`}
                style={{
                  backgroundColor: theme === "light" ? "#222" : "",
                  borderRadius: "6px",
                }}
              >
                <p
                  style={{ color: theme === "light" ? "#444" : "" }}
                  className="iconElement"
                >
                  {" "}
                  <FiSun />
                </p>
                <p
                  className="toggleText"
                  style={{ color: theme === "light" ? "#444" : "" }}
                >
                  Light
                </p>
              </p>

              <p
                id="iconMoon"
                className={`toggle-icon ${theme === "light" ? "active" : ""}`}
                style={{ backgroundColor: theme === "light" ? "#333" : "" }}
              >
                <p className="iconElement">
                  {" "}
                  <HiOutlineMoon />
                </p>
                <p className="toggleText">Dark</p>
              </p>
            </div>
          </span>
        </label>
      </div>
    </div>
  );
};

export default NavBar;
