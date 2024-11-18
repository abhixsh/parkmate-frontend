export default function AboutUs() {
  return (
    <div className="bg-white px-6 py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-semibold font-['Poppins'] leading-[54px]">
          About <span className="text-[#ffbb00]">Us</span>
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold font-['Poppins'] text-black mb-4">
              Welcome to ParkMaster!
            </h2>
            <p className="text-base font-normal font-['Poppins'] text-black">
              At ParkMaster, we are revolutionizing the way you park. Our mission is to simplify parking for everyone—whether you're a daily commuter, a weekend adventurer, or a business looking to optimize your parking space.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold font-['Poppins'] text-black mb-4">
              Who We Are
            </h2>
            <p className="text-base font-normal font-['Poppins'] text-black">
              We are a team of passionate innovators committed to making parking stress-free and efficient. Our smart parking management system leverages modern technology to provide a seamless experience for users and administrators alike.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold font-['Poppins'] text-black mb-4">
              Our Vision
            </h2>
            <p className="text-base font-normal font-['Poppins'] text-black">
              To create a world where finding a parking spot is effortless, saving time, reducing congestion, and promoting smarter urban mobility.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center items-center">
          <img
            className="w-full max-w-[287px] h-auto rounded-[34px]"
            src="img/about.jpeg"
            alt="About Us"
          />
        </div>
      </div>
    </div>
  );
}
