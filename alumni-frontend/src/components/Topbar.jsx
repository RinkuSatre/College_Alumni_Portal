import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BellFill, PersonCircle } from "react-bootstrap-icons";
import API from "../api/axios";
import "./Topbar.css";

function Topbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [count, setCount] = useState(0);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications = async () => {

    try {

      const response = await API.get("notifications/");

      const unread = response.data.filter(
        (item) => !item.is_read
      );

      setCount(unread.length);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="topbar">

      <div>

        <h2>
          Welcome, {user?.username} 👋
        </h2>

        <p>{today}</p>

      </div>

      <div className="topbar-right">

        {/* Notification */}

        <Link
          to="/notifications"
          className="notification"
        >

          <BellFill />

          {count > 0 && (

            <span>{count}</span>

          )}

        </Link>

        {/* Profile */}

        <div className="profile">

          <PersonCircle />

          <div>

            <h4>{user?.username}</h4>

            <p>{user?.role}</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Topbar;