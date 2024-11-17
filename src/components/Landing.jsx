import { useState, useEffect } from "react";

const testimonials = [
  {
    text: `"ParkMate has transformed parking in Sri Lanka. Finding and reserving a parking space has never been easier. Highly recommend this web for stress-free parking!"`,
    name: "Nimal Perera",
    title: "Frequent User",
    image: "src\img\Nimal.jpeg",
  },
  {
    text: `"Managing parking lots in Sri Lanka was a challenge. With ParkMate’s tools, our team can now manage operations more efficiently and provide real-time updates to users."`,
    name: "Ruwan Fernando",
    title: "Parking Lot Manager",
    image: "src\img\Ruwan.jpeg",
  },
  {
    text: `"ParkMate is a game changer! The web has made parking simple for users in Sri Lanka, especially in high-traffic areas like Colombo."`,
    name: "Ishani De Silva",
    title: "Happy User",
    image: "src\img\Ishani.jpeg",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white pt-12 md:pt-12">
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
            <img
              className="w-12 h-12 rounded-full"
              src={currentTestimonial.image}
              alt={`${currentTestimonial.name} profile`}
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
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="w-full relative bg-white">
      {/* Top Section */}
      <div className="w-full max-w-screen-xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
  {/* Image Section */}
  <div>
    <img
      className="w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-xl object-cover"
      src="src\img\parking.png"
      alt="Parking"
    />
  </div>

  {/* Text Section */}
  <div className="flex flex-col justify-center space-y-4">
    <p className="text-[#494949] text-lg sm:text-xl md:text-2xl font-semibold">
      Welcome to ParkMate
    </p>
    <h1 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold leading-snug">
      Don’t Let Parking be a Hassle.
      <br />
      <span className="text-[#ffbb00]">Reserve Your Spot Today!</span>
    </h1>
    <p className="text-black text-sm md:text-base font-light">
      Tired of driving around looking for a parking spot? ParkMate makes
      parking easier, faster, and more convenient. Whether you’re a driver
      looking for a spot or an admin managing parking operations, ParkMate
      has you covered.
    </p>
  </div>
</div>



            {/* Stats Section */}
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between mt-20 px-4">
        {/* All Parking Spaces */}
        <div className="bg-white rounded-lg shadow-md w-full sm:w-[387px] mb-6 sm:mb-0 sm:h-[169px] flex flex-col justify-center items-start px-8 py-6">
          <h3 className="text-black text-[48px] sm:text-[64px] font-semibold">50</h3>
          <p className="text-[#ffbb00] text-[17px] font-semibold">
            All <span className="text-black">Parking Spaces</span>
          </p>
          {/* <span className="text-[#494949] text-[13px] font-normal">
            Information today
          </span> */}
        </div>

        {/* Available Parking Spaces */}
        <div className="bg-white rounded-lg shadow-md w-full sm:w-[387px] mb-6 sm:mb-0 sm:h-[169px] flex flex-col justify-center items-start px-8 py-6">
          <h3 className="text-black text-[48px] sm:text-[64px] font-semibold">25</h3>
          <p className="text-[#ffbb00] text-[17px] font-semibold">
            Available <span className="text-black">Parking Spaces</span>
          </p>
          {/* <span className="text-[#494949] text-[13px] font-normal">
            Information today
          </span> */}
        </div>

        {/* Booked Parking Spaces */}
        <div className="bg-white rounded-lg shadow-md w-full sm:w-[387px] sm:h-[169px] flex flex-col justify-center items-start px-8 py-6">
          <h3 className="text-black text-[48px] sm:text-[64px] font-semibold">25</h3>
          <p className="text-[#ffbb00] text-[17px] font-semibold">
            Booked <span className="text-black">Parking Spaces</span>
          </p>
          {/* <span className="text-[#494949] text-[13px] font-normal">
            Information today
          </span> */}
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />


        {/* Services Section */}
        <div className="max-w-7xl mx-auto mt-12 lg:mt-20 px-6 sm:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {["24hr Services", "Expert Team", "Excellent Support"].map((service, index) => (
            <div key={index} className="text-center px-4 py-6 bg-white rounded-lg shadow-md">
              <img
                className="mx-auto h-32 w-32"
                src={`https://via.placeholder.com/227x227`}
                alt={service}
              />
              <h3 className="text-lg font-semibold text-gray-900 mt-4">{service}</h3>
              <p className="text-sm mt-2 text-gray-600">
                Sed ut perspiciatis unde omnis iste natus error sit volupta.
              </p>
            </div>
          )
          )}
        </div>
      </div>
      );
};

      export default LandingPage;
