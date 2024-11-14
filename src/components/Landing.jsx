import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Landing() {
  const [availableSpots, setAvailableSpots] = useState(0);

  useEffect(() => {
    async function fetchAvailableSpots() {
      const response = await fetch("http://localhost:5050/parkingSpots");
      if (response.ok) {
        const data = await response.json();
        setAvailableSpots(data.filter((spot) => spot.available).length);
      }
    }
    fetchAvailableSpots();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-4xl font-bold text-center mt-8">Welcome to Our Parking Management System</h1>
      <p className="text-center mt-4">Reserve your parking spot easily and reliably!</p>

      <div className="mt-10 text-center">
        <p className="text-2xl font-semibold">Available Parking Spots: {availableSpots}</p>
      </div>
    </motion.div>
  );
}
