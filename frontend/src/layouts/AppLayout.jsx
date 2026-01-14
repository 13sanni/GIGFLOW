import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import socket from "../socket/Socket.jsx";

const AppLayout = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("bid:new", (data) => {
      console.log("New bid received:", data);
      alert("New bid received on your gig!");
    });

    socket.on("bid:accepted", (data) => {
      console.log("Bid accepted:", data);
      alert("You have been hired!");
    });

    return () => {
      socket.off("bid:new");
      socket.off("bid:accepted");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
