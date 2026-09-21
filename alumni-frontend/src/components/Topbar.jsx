import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BellFill, PersonCircle } from "react-bootstrap-icons";
import API from "../api/axios";
import "./Topbar.css";

function Topbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [count, setCount] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {

    fetchNotifications();
    fetchProfile();

  }, []);

  // Notifications
  const fetchNotifications = async () => {

    try {

      const response = await API.get("notifications/");

      const unread = response.data.filter(
        (item) => !item.is_read
      );

      setCount(unread.length);

    } catch (error) {

      console.log(error);

    }

  };

  // Profile Photo
  const fetchProfile = async () => {

    try {

      let response;

      if (user?.role === "alumni") {

        response = await API.get("profiles/alumni/");

      } else {

        response = await API.get("profiles/student/");

      }

      if (response.data?.profile_photo) {

        setProfilePhoto(response.data.profile_photo);

      }

    } catch (error) {

      console.log("Profile photo error:", error);

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

          {profilePhoto ? (

            <img
              src={profilePhoto}
              alt="Profile"
              className="topbar-profile-photo"
            />

          ) : (

            <PersonCircle className="profile-icon" />

          )}

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