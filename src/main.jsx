import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ReservationList from "./components/ReservationList";
import Reservation from "./components/ReservationForm";
import Landing from "./components/Landing";
import AddParkingSpot from "./components/AddParkingSpot";
import AboutUs from "./components/AboutUs";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/reservations", element: <AddParkingSpot /> },
      { path: "/create", element: <Reservation /> },
      //{ path: "/edit/:id", element: <Reservation /> },
      { path: "/about", element: <AboutUs /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
