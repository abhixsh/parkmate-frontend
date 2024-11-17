import { useState, useEffect } from "react";

const testimonials = [
  {
    text: `"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."`,
    name: "Micheal Gough",
    title: "CEO at Google",
    image: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
  },
  {
    text: `"ParkMate has revolutionized the way I park. Reserving a spot is now so simple, and I no longer worry about finding parking during peak hours. Highly recommend it!"`,
    name: "Jessica Green",
    title: "Frequent User",
    image: "https://via.placeholder.com/150",
  },
  {
    text: `"Managing parking spaces has never been easier. The admin tools provided by ParkMate are incredibly intuitive and save us a lot of time."`,
    name: "John Doe",
    title: "Parking Admin",
    image: "https://via.placeholder.com/150",
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
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
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
              className="w-6 h-6 rounded-full"
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
      <div className="w-[1280px] h-[558px] mx-auto mt-[151px] relative">
        <img
          className="w-full h-[350px] rounded-[15px]"
          src="https://via.placeholder.com/1280x350"
          alt="Parking"
        />
        <div className="absolute left-[21px] top-[418px] text-center text-[#494949] text-2xl font-semibold">
          Welcome to ParkMate
        </div>
        <div className="absolute left-[18px] top-[450px]">
          <h1 className="text-black text-5xl font-semibold leading-[54px]">
            Don’t Let Parking be Hassle.
            <br />
            <span className="text-[#ffbb00]">Reserve Your Spot Today!</span>
          </h1>
        </div>
        <p className="w-[514px] absolute left-[739px] top-[458px] text-black text-sm font-light">
          Tired of driving around looking for a parking spot? ParkMaster makes
          parking easier, faster, and more convenient. Whether you’re a driver
          looking for a spot or an admin managing parking operations, ParkMaster
          has you covered.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-[1243px] mx-auto flex flex-wrap justify-between mt-[200px] space-y-4 sm:space-y-0">
        {/* All Parking Spaces */}
        <div className="bg-white rounded-[18px] shadow w-[387px] h-[169px] flex flex-col justify-center items-start px-8">
          <h3 className="text-black text-[64px] font-semibold">50</h3>
          <p className="text-[#ffbb00] text-[17px] font-semibold">
            All <span className="text-black">Parking Spaces</span>
          </p>
          <span className="text-[#494949] text-[13px] font-normal">
            Information today
          </span>
        </div>

        {/* Available Parking Spaces */}
        <div className="bg-white rounded-[18px] shadow w-[387px] h-[169px] flex flex-col justify-center items-start px-8">
          <h3 className="text-black text-[64px] font-semibold">25</h3>
          <p className="text-[#ffbb00] text-[17px] font-semibold">
            Available <span className="text-black">Parking Spaces</span>
          </p>
          <span className="text-[#494949] text-[13px] font-normal">
            Information today
          </span>
        </div>

        {/* Booked Parking Spaces */}
        <div className="bg-white rounded-[18px] shadow w-[387px] h-[169px] flex flex-col justify-center items-start px-8">
          <h3 className="text-black text-[64px] font-semibold">25</h3>
          <p className="text-[#ffbb00] text-[17px] font-semibold">
            Booked <span className="text-black">Parking Spaces</span>
          </p>
          <span className="text-[#494949] text-[13px] font-normal">
            Information today
          </span>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Services Section */}
      <div className="max-w-[927px] mx-auto mt-[200px] flex flex-wrap justify-between">
        {/* Service Card */}
        {["24hr Services", "Expert Team", "Excellent Support"].map(
          (service, index) => (
            <div key={index} className="text-center w-[275px]">
              <img
                src={`https://via.placeholder.com/227x227`}
                alt={service}
                className="mx-auto"
              />
              <h3 className="text-black text-2xl font-semibold mt-4">
                {service}
              </h3>
              <p className="text-[#8b8b9d] text-base font-semibold mt-2">
                Sed ut perspiciatis unde omnis iste
                <br />
                natus error sit volupta.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LandingPage;
