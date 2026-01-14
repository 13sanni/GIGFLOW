import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import socket from "../socket/Socket.jsx";
import { addNotification } from "../store/NotificationsSlice.jsx";

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on("bid:new", (data) => {
      dispatch(
        addNotification({
          type: "bid:new",
          message: "New bid received on your gig",
          gigId: data.gigId,
        })
      );
    });

    socket.on("bid:accepted", (data) => {
      dispatch(
        addNotification({
          type: "bid:accepted",
          message: "You have been hired",
          gigId: data.gigId,
        })
      );
    });

    return () => {
      socket.off("bid:new");
      socket.off("bid:accepted");
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
