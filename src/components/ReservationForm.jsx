export default function ReservationForm() {
  return (
    <div className="bg-white px-6 py-12 sm:px-12 md:px-24 lg:px-32">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold text-black font-poppins">
          Reserve Your <span className="text-[#ffbb00]">Parking Spot.</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base font-light text-gray-700 max-w-3xl mx-auto">
          Save time and secure your parking spot in advance! Choose your preferred date, time, and parking slot, and confirm your booking instantly.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 lg:p-16 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-black text-center mb-6 sm:mb-8">Book Your Spot Now</h2>

        <div className="w-full flex justify-center mb-6">
          <img className="w-full max-w-xs sm:max-w-md md:max-w-lg" src="https://via.placeholder.com/298x209" alt="Booking Image" />
        </div>

        <div className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-lg font-semibold text-black mb-2">Full Name:</label>
            <input
              id="fullName"
              type="text"
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
            />
          </div>

          {/* Reservation Date Field */}
          <div>
            <label htmlFor="reservationDate" className="block text-lg font-semibold text-black mb-2">Select Reservation Date:</label>
            <input
              id="reservationDate"
              type="date"
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
            />
          </div>

          {/* Vehicle Plate Number & Vehicle Type Fields */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="plateNumber" className="block text-lg font-semibold text-black mb-2">Vehicle Plate Number:</label>
              <input
                id="plateNumber"
                type="text"
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="vehicleType" className="block text-lg font-semibold text-black mb-2">Vehicle Type:</label>
              <input
                id="vehicleType"
                type="text"
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              />
            </div>
          </div>

          {/* Start Time & End Time Fields */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block text-lg font-semibold text-black mb-2">Start Time:</label>
              <input
                id="startTime"
                type="time"
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="block text-lg font-semibold text-black mb-2">End Time:</label>
              <input
                id="endTime"
                type="time"
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              />
            </div>
          </div>

          {/* Parking Spot Preference Field */}
          <div>
            <label htmlFor="parkingPreference" className="block text-lg font-semibold text-black mb-2">Parking Spot Preference:</label>
            <input
              id="parkingPreference"
              type="text"
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
            />
          </div>

          {/* Reserve Button */}
          <div className="text-center">
            <button className="px-8 py-3 text-lg font-bold text-white bg-[#ffbb00] rounded-lg hover:bg-[#e6a800] transition duration-300">
              Reserve My Spot
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold text-black">Parking Slot Map</h3>
        <img className="mt-6 w-full rounded-xl" src="https://via.placeholder.com/1289x538" alt="Parking Map" />
      </div>
    </div>
  );
}
