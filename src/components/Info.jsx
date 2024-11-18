import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-['Poppins']">
          My <span className="text-[#ffbb00]">Reservations</span>
        </h1>
        <p className="mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base font-light font-['Poppins'] text-black">
          View and manage your parking reservations easily.
        </p>
      </div>

      {/* Details Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-12 mb-12 sm:mb-16">
        {/* Details Card */}
        <div className="relative w-full max-w-2xl lg:max-w-3xl bg-white border-2 sm:border-4 border-[#ffbb00] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-semibold font-['Poppins'] text-black mb-4">
              My Details
            </h2>
            <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="font-semibold">Full Name:</span>
                <span className="font-normal">Abishek Haththakage</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email Address:</span>
                <span className="font-normal">aloka.abishek@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone Number:</span>
                <span className="font-normal">076-5576407</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Username:</span>
                <span className="font-normal">abhixsh</span>
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src="img/reserve.jpg"
              alt="User Details"
              className="rounded-lg sm:rounded-2xl w-full max-w-xs sm:max-w-sm h-auto"
            />
          </div>
        </div>
      </div>

      {/* Reservations Section */}
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold font-['Poppins'] text-black mb-6 sm:mb-8">
        Reservations<span className="text-[#ffbb00]">..</span>
      </h2>

      {/* Reservations Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl lg:max-w-7xl mx-auto">
        {/* Reservation Card */}
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg sm:rounded-2xl shadow-md p-4 sm:p-6 space-y-2 sm:space-y-4 text-sm sm:text-base"
          >
            <div className="flex justify-between">
              <span className="font-semibold">Full Name:</span>
              <span className="font-normal">Abishek Haththakage</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Vehicle Type:</span>
              <span className="font-normal">Motorcycle</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Vehicle Plate Number:</span>
              <span className="font-normal">XYZ-5678</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Reservation Date:</span>
              <span className="font-normal">Nov 18, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Start Time:</span>
              <span className="font-normal">3:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">End Time:</span>
              <span className="font-normal">4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Parking Spot:</span>
              <span className="font-semibold text-[#32e316]">31-B</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
