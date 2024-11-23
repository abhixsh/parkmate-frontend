import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ReservationList from "./components/ReservationList";
import Reservation from "./components/ReservationForm";
import Landing from "./components/Landing";
import AdminDashboard from './components/AdminDashboard';
import ManageParkingSpots from './components/ManageParkingSpots';
import ManageReservations from './components/ManageReservations';
import AddParkingSpot from './components/AddParkingSpot';
import AboutUs from "./components/AboutUs";
import Login from './components/Login';
import Register from './components/Register';
import "./index.css";
import ReservationForm from "./components/ReservationForm";
import Info from "./components/Info";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/reservations", element: <ReservationList /> },
      { path: "/create", element: <Reservation /> },
      //{ path: "/edit/:id", element: <Reservation /> },
      { path: "/about", element: <AboutUs /> },
      { path:"/login", element: <Login /> },
      { path: "/register", element: <Register />},
      { path: "/admin", element: <AdminDashboard />},
      { path: "/manage-parking-spots", element: <ManageParkingSpots />},
      { path: "/manage-reservations", element: <ManageReservations />},
      { path: "/add-parking-spot", element: <AddParkingSpot />},
      {path: "/reservation", element: <ReservationForm />},
      {path: "/info", element: <Info />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
