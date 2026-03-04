import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import socket from "../socket/Socket.jsx";
import api from "../lib/Axios.jsx";
import {
  addNotification,
  setNotifications
} from "../store/NotificationsSlice.jsx";

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications");
        dispatch(setNotifications(res.data.notifications || []));
      } catch {
        dispatch(setNotifications([]));
      }
    };

    fetchNotifications();
    socket.connect();

    socket.on("notification:new", (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.off("notification:new");
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
