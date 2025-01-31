import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user details from localStorage and reservations on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserDetails(user);  // Set the user details state
      fetchUserReservations(user.email);  // Fetch reservations for the logged-in user
    } else {
      setLoading(false);  // If no user is found, stop the loading
    }
  }, []);

  // Function to fetch reservations by user email
  const fetchUserReservations = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/parkmate/reservation/email/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReservations(data);  // Set the reservations state with fetched data
      } else {
        console.error('Failed to fetch reservations');
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);  // Set loading to false after data is fetched
    }
  };

  // Function to format Unix timestamps into readable date format (MM/DD/YYYY)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);  // Convert seconds to milliseconds

    // Get MM/DD/YYYY format
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;  // Return formatted date
  };

  // Function to format Unix timestamps into time format (HH:MM:SS AM/PM)
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);  // Convert seconds to milliseconds

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;  // Convert to 12-hour format

    return `${formattedHours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`;
  };

  if (loading) {
    return <div>Loading...</div>;  // Show a loading state while waiting for user data and reservations
  }

  if (!userDetails) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold">Please log in to view your reservations</h2>
      </div>
    );
  }

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
                <span className="font-normal">{userDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Email :</span>
                <span className="font-normal">{userDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone Number:</span>
                <span className="font-normal">{userDetails.phoneNumber}</span>
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
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div
              key={reservation.reservationId}
              className="bg-white rounded-lg sm:rounded-2xl shadow-md p-4 sm:p-6 space-y-2 sm:space-y-4 text-sm sm:text-base"
            >
              <div className="flex justify-between">
                <span className="font-semibold">Full Name:</span>
                <span className="font-normal">{reservation.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Vehicle Type:</span>
                <span className="font-normal">{reservation.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Vehicle Plate Number:</span>
                <span className="font-normal">{reservation.vehiclePlateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Reservation Date:</span>
                <span className="font-normal">{formatDate(reservation.reservationDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Start Time:</span>
                <span className="font-normal">{formatTime(reservation.startTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">End Time:</span>
                <span className="font-normal">{formatTime(reservation.endTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Parking Spot:</span>
                <span className="font-semibold text-[#32e316]">{reservation.spotName}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No reservations found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
