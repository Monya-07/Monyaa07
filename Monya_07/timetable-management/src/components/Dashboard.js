import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Timetable from "./Timetable"; // Ensure that the Timetable component is correctly imported

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <Timetable />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
