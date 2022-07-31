import React from "react";
import "./Navigation.css";
import menuElements from "./NavigationData";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const { pathname } = useLocation();
  const isActive = React.useCallback((href: string) => {
    return href === pathname;
  }, []);
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg home-navbar">
      <a className="navbar-brand" href="#">
        COLLABOR@TE
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {menuElements.map(({ name, href }, index) => {
            return (
              <li key={index}>
                <Link
                  className={`nav-link ${isActive(href) && "active"}`}
                  to={href}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
