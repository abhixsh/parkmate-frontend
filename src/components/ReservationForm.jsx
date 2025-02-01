import React, { useState, useEffect } from "react";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    reservationId: null,
    fullName: "",
    email: "",
    vehicleType: "",
    vehiclePlateNumber: "",
    reservationDate: "",
    startTime: "",
    endTime: "",
    spotName: "",
  });
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [availableSpots, setAvailableSpots] = useState([]); 
  const [showAvailableSlots, setShowAvailableSlots] = useState(false); 

  const API_BASE_URL = 'http://localhost:8080/parkmate/reservation';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeChange = (field, timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date(formData.reservationDate);
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    setFormData({
      ...formData,
      [field]: timeString,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.vehicleType ||
      !formData.vehiclePlateNumber ||
      !formData.reservationDate ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.spotName
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const reservationData = {
      ...formData,
      reservationDate: formData.reservationDate ? new Date(formData.reservationDate).getTime() : null,
      startTime: formData.startTime ? new Date(formData.reservationDate + "T" + formData.startTime).getTime() : null,
      endTime: formData.endTime ? new Date(formData.reservationDate + "T" + formData.endTime).getTime() : null,
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setNotification({ message: "Reservation successfully created!", type: "success" });
        setTimeout(() => {
          setNotification(null);
        }, 3000);

        setFormData({
          reservationId: null,
          fullName: "",
          email: "",
          vehicleType: "",
          vehiclePlateNumber: "",
          reservationDate: "",
          startTime: "",
          endTime: "",
          spotName: "",
        });
        setError(null);
      } else {
        const errorData = await response.text();
        setNotification({ message: `Error creating reservation: ${errorData}`, type: "error" });
        setTimeout(() => {
          setNotification(null);
        }, 20000);
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      setNotification({ message: "Error submitting reservation. Please try again.", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 20000);
    }
  };

  const fetchAvailableParkingSpots = async () => {
    try {
      const response = await fetch('http://localhost:8080/parkmate/parkingspot/available', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSpots(data);
      } else {
        console.error("Failed to fetch available parking spots");
      }
    } catch (error) {
      console.error("Error fetching available parking spots:", error);
    }
  };

  const toggleAvailableSlots = () => {
    setShowAvailableSlots(!showAvailableSlots); 
    if (!showAvailableSlots) {
      fetchAvailableParkingSpots(); 
    }
  };

  return (
    <div className="bg-white px-6 py-12 sm:px-12 md:px-24 lg:px-32">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold text-black font-poppins">
          Reserve Your <span className="text-[#ffbb00]">Parking Spot.</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base font-light text-gray-700 max-w-3xl mx-auto">
          Save time and secure your parking spot in advance! Choose your preferred date, time, and parking slot, and confirm your booking instantly.
        </p>
      </div>

      {notification && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-md text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 lg:p-16 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-black text-center mb-6 sm:mb-8">Book Your Spot Now</h2>

        <div className="w-full flex justify-center mb-6">
          <img className="w-full max-w-xs sm:max-w-sm md:max-w-md" src="img/car.png" alt="Booking Image" />
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-lg font-semibold text-black mb-2">Full Name:</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-semibold text-black mb-2">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="reservationDate" className="block text-lg font-semibold text-black mb-2">Select Reservation Date:</label>
            <input
              id="reservationDate"
              name="reservationDate"
              type="date"
              value={formData.reservationDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="vehiclePlateNumber" className="block text-lg font-semibold text-black mb-2">Vehicle Plate Number:</label>
              <input
                id="vehiclePlateNumber"
                name="vehiclePlateNumber"
                type="text"
                value={formData.vehiclePlateNumber}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="vehicleType" className="block text-lg font-semibold text-black mb-2">Vehicle Type:</label>
              <input
                id="vehicleType"
                name="vehicleType"
                type="text"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block text-lg font-semibold text-black mb-2">Start Time:</label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleTimeChange('startTime', e.target.value)}
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="block text-lg font-semibold text-black mb-2">End Time:</label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleTimeChange('endTime', e.target.value)}
                className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="spotName" className="block text-lg font-semibold text-black mb-2">Parking Spot Preference:</label>
            <input
              id="spotName"
              name="spotName"
              type="text"
              value={formData.spotName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 border border-[#ffbb00] rounded-md"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="px-8 py-3 text-lg font-bold text-white bg-[#ffbb00] rounded-lg hover:bg-[#e6a800] transition duration-300">
              Reserve My Spot
            </button>
          </div>
        </form>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-2xl font-semibold text-black">Parking Slot Map</h3>
        <img className="mt-6 w-full rounded-xl" src="img/parking.png" alt="Parking Map" />
      </div>

      <div className="text-center mt-6">
        <button
          onClick={toggleAvailableSlots}
          className="px-6 py-3 text-lg font-bold text-white bg-[#ffbb00] rounded-lg hover:bg-[#e6a800] transition duration-300"
        >
          {showAvailableSlots ? "Hide Available Slots" : "Show Available Slots"}
        </button>
      </div>

      {showAvailableSlots && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-black text-center mb-6">Available Parking Slots</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {availableSpots.length > 0 ? (
              availableSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <span className="text-lg font-semibold text-gray-900">{spot.name}</span>
                      <span className="px-3 py-1 bg-[#ffbb00]/10 text-[#ffbb00] rounded-full text-sm font-medium">
                        {spot.location}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Hourly Rate</span>
                        <span className="font-medium">${spot.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium">{spot.type}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Available</span>
                        <span className="font-medium">{spot.isAvailable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-xl shadow">
                <p className="text-gray-500 text-lg">No available spots</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
