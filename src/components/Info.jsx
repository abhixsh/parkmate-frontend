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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Login Required
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Please log in to view your reservations
        </p>
        <a
          href="/login"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ffbb00] hover:bg-[#e5a800] transition-colors duration-300"
        >
          Go to Login
        </a>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Poppins'] tracking-tight">
          My <span className="text-[#ffbb00] relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-[#ffbb00]/20">Reservations</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 font-['Poppins']">
          View and manage your parking reservations in one place
        </p>
      </div>

      {/* Details Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="transform hover:scale-[1.01] transition-transform duration-300 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row p-8 gap-8">
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-['Poppins'] text-gray-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#ffbb00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Details
              </h2>
              <div className="space-y-4 text-base sm:text-lg">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Full Name</span>
                  <span className="text-gray-900">{userDetails.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Email</span>
                  <span className="text-gray-900">{userDetails.email}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Phone Number</span>
                  <span className="text-gray-900">{userDetails.phoneNumber}</span>
                </div>
              </div>
            </div>
            {/* Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src="img/reserve.jpg"
                alt="User Details"
                className="rounded-xl w-full max-w-md h-auto object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 font-['Poppins']">
          Active Reservations
          <span className="text-[#ffbb00]">.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div
                key={reservation.reservationId}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-lg font-semibold text-gray-900">{reservation.fullName}</span>
                    <span className="px-3 py-1 bg-[#ffbb00]/10 text-[#ffbb00] rounded-full text-sm font-medium">
                      {reservation.spotName}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vehicle Type</span>
                      <span className="font-medium">{reservation.vehicleType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Plate Number</span>
                      <span className="font-medium">{reservation.vehiclePlateNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{formatDate(reservation.reservationDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">
                        {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 bg-white rounded-xl shadow">
              <p className="text-gray-500 text-lg">No reservations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
