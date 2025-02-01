import { useState, useEffect } from "react";
import { motion } from "framer-motion"; 

const testimonials = [
  {
    text: `"ParkMate has transformed parking in Sri Lanka. Finding and reserving a parking space has never been easier. Highly recommend this web for stress-free parking!"`,
    name: "Nimal Perera",
    title: "Frequent User",
    image: "img/Nimal.png",
  },
  {
    text: `"Managing parking lots in Sri Lanka was a challenge. With ParkMate’s tools, our team can now manage operations more efficiently and provide real-time updates to users."`,
    name: "Ruwan Fernando",
    title: "Parking Lot Manager",
    image: "img/Ruwan.png",
  },
  {
    text: `"ParkMate is a game changer! The web has made parking simple for users in Sri Lanka, especially in high-traffic areas like Colombo."`,
    name: "Ishani De Silva",
    title: "Happy User",
    image: "img/Ishani.png",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.section
      className="bg-white pt-12 md:pt-12"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <div className="max-w-screen-xl px-4 mx-auto text-center">
        <figure className="max-w-screen-md mx-auto transition-all duration-500 ease-in-out">
          <svg
            className="h-12 mx-auto mb-3 text-gray-400"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl font-medium text-gray-900">
              {currentTestimonial.text}
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <motion.img
              className="w-12 h-12 rounded-full"
              src={currentTestimonial.image}
              alt={`${currentTestimonial.name} profile`}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1, delay: 0.5 }} 
            />
            <div className="flex items-center divide-x-2 divide-gray-500">
              <div className="pr-3 font-medium text-gray-900">
                {currentTestimonial.name}
              </div>
              <div className="pl-3 text-sm font-light text-gray-500">
                {currentTestimonial.title}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </motion.section>
  );
};

const LandingPage = () => {
  return (
    <div className="w-full relative bg-white">
      {/* Top Section */}
      <motion.div
        className="w-full max-w-screen-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        {/* Image Section */}
        <div>
          <motion.img
            className="w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-xl object-cover"
            src="img\parking.png"
            alt="Parking"
            initial={{ x: -100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 1 }}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center space-y-4">
          <p className="text-[#494949] text-lg sm:text-xl md:text-2xl font-semibold">
            Welcome to ParkMate
          </p>
          <motion.h1
            className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-snug"
            initial={{ y: -50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1, delay: 0.3 }}
          >
            Don’t Let Parking be a Hassle.
            <br />
            <span className="text-[#ffbb00]">Reserve Your Spot Today!</span>
          </motion.h1>
          <p className="text-black text-sm md:text-base font-light">
            Tired of driving around looking for a parking spot? ParkMate makes
            parking easier, faster, and more convenient. Whether you’re a driver
            looking for a spot or an admin managing parking operations, ParkMate
            has you covered.
          </p>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Services Section */}
      <div className="max-w-7xl mx-auto mt-12 lg:mt-20 px-6 sm:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {/* Service 1 */}
        <motion.div
          className="text-center px-4 py-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="img/time.png"
            alt="Reserve"
            className="mx-auto w-16 h-16 mb-4"
          />
          <h3 className="text-lg font-semibold">24hr Services</h3>
          <p className="text-sm text-gray-500 mt-2">
            We provide round-the-clock services to ensure you never have to worry about parking.
          </p>
        </motion.div>

        {/* Service 2 */}
        <motion.div
          className="text-center px-4 py-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="img/team.png"
            alt="Manage"
            className="mx-auto w-16 h-16 mb-4"
          />
          <h3 className="text-lg font-semibold">Expert Team</h3>
          <p className="text-sm text-gray-500 mt-2">
            Our team of experts ensures the smooth operation of our parking services, helping you with any concerns.
          </p>
        </motion.div>

        {/* Service 3 */}
        <motion.div
          className="text-center px-4 py-6 bg-white rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <img
            src="img/support.png"
            alt="Track"
            className="mx-auto w-16 h-16 mb-4"
          />
          <h3 className="text-lg font-semibold">Excellent Support</h3>
          <p className="text-sm text-gray-500 mt-2">
            Our support team is always available to assist you with any parking-related issues.          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
