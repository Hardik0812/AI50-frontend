import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-grayShade  w-100 py-3.5">
      <div className="flex items-center justify-between px-16">
        <div className="">
          <p>2024© AI50 Team</p>
        </div>
        <div>
          <Link to="#" className="mr-8">
            Terms of Service
          </Link>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
