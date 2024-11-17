import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full relative bg-[#ffbb00] text-black clear-both">
      {/* Background and container */}
      <div className="w-full h-auto flex flex-col lg:flex-row justify-between items-start px-6 lg:px-24 py-6">
        
        {/* Logo and Description */}
        <div className="max-w-sm mb-6 lg:mb-0">
          <h1 className="text-[32px] font-extrabold font-['Poppins']">
            <span className="text-white">Park</span>
            <span className="text-black">Mate</span>
          </h1>
          <p className="text-[15px] font-light font-['Poppins'] mt-4">
            Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui rati.
          </p>
        </div>

        {/* Working Hours - Hidden on Mobile */}
        <div className="hidden sm:block mb-6 lg:mb-0">
          <h2 className="text-2xl font-medium font-['Poppins']">
            <span className="text-[#f7d914]">| </span>Working Days
          </h2>
          <div className="mt-4">
            <p className="font-medium text-base">
              Mon - Fri
              <span className="font-normal"> 8:00 AM - 11:00 PM</span>
            </p>
            <p className="font-medium text-base">
              Sat - Sun
              <span className="font-normal"> 8:00 AM - 05:00 PM</span>
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-2xl font-medium font-['Poppins']">
            <span className="text-[#f7d914]">| </span>Our Services
          </h2>
          <ul className="mt-4 text-sm font-normal font-['Poppins'] leading-7">
            <li><a href="/reservation">Reserve a Spot</a></li>
            <li><a href="/reservations">My Reservations</a></li>
            <li><a href="/login">Log In</a></li>
            <li className="hidden sm:block"><a href="/register">Sign Up</a></li>
            <li className="hidden sm:block"><a href="/about">About ParkMate</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-2xl font-medium font-['Poppins']">
            <span className="text-[#f7d914]">| </span>Contact Us
          </h2>
          <p className="mt-4 text-sm font-normal font-['Poppins'] leading-7">
            Badulla Rad, Passara, Sri Lanka <br />
            <span>Info@parkmate.com</span> <br />
            <span>Support@parkmate.com</span>
          </p>
          {/* Social Media Icons */}
          <div className="flex mt-4 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-white"
            >
              <FaFacebookF size={25} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-white"
            >
              <FaTwitter size={25} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-white"
            >
              <FaLinkedinIn size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
