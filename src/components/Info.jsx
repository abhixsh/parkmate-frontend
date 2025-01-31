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
    }
  }, []);

  // Function to fetch reservations by user email
  const fetchUserReservations = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/parkmate/reservation', {
        method: 'GET',
        headers: {
          'Authorization': email,  // Send email in header as Authorization
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

  if (!userDetails || loading) {
    return <div>Loading...</div>;  // Show a loading state while waiting for user data and reservations
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
                <span className="font-normal">{reservation.reservationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Start Time:</span>
                <span className="font-normal">{reservation.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">End Time:</span>
                <span className="font-normal">{reservation.endTime}</span>
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
