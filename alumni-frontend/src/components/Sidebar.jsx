import { Link, useNavigate } from "react-router-dom";

import {
  HouseDoorFill,
  PersonFill,
  BriefcaseFill,
  CalendarEventFill,
  ChatDotsFill,
  TrophyFill,
  StarFill,
  EnvelopeFill,
  BoxArrowRight,
  ChatLeftDotsFill,
  PeopleFill,
  BellFill,
  BarChartFill,
  GearFill,
} from "react-bootstrap-icons";

import logo from "../assets/images/yspm-logo.png";
import "./Sidebar.css";


function Sidebar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const role = user?.role;


  const dashboardRoute =
    role === "student"
      ? "/student/dashboard"
      : role === "alumni"
      ? "/alumni/dashboard"
      : "/admin/dashboard";


  const profileRoute =
    role === "student"
      ? "/student/profile"
      : "/alumni/profile";


  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    navigate("/");

  };


  return (

    <div className="sidebar">

      <div>

        {/* ================= LOGO ================= */}

        <div className="sidebar-logo">

          <img
            src={logo}
            alt="YTC Logo"
          />

          <h3>YTC Alumni</h3>

        </div>


        {/* ================= ADMIN SIDEBAR ================= */}

        {role === "admin" ? (

          <ul>

            <li>
              <Link to="/admin/dashboard">
                <HouseDoorFill />
                Dashboard
              </Link>
            </li>


            <li>
              <Link to="/admin/users">
                <PeopleFill />
                Users
              </Link>
            </li>


            <li>
              <Link to="/jobs">
                <BriefcaseFill />
                Jobs
              </Link>
            </li>


            <li>
              <Link to="/events">
                <CalendarEventFill />
                Events
              </Link>
            </li>


            <li>
              <Link to="/forum">
                <ChatDotsFill />
                Forum
              </Link>
            </li>


            <li>
              <Link to="/notifications">
                <BellFill />
                Notifications
              </Link>
            </li>


            <li>
              <Link to="/admin/reports">
                <BarChartFill />
                Reports
              </Link>
            </li>

            <li>
              <Link to="/admin/feedback">
              <StarFill />
                Feedback
              </Link>
            </li>

            
            <li>
              <Link to="/admin/contact-queries">
                <EnvelopeFill />
                Contact Queries
              </Link>
            </li>


            <li>
              <Link to="/admin/settings">
                <GearFill />
                Settings
              </Link>
            </li>

          </ul>

        ) : (

          /* ================= STUDENT / ALUMNI ================= */

          <ul>

            <li>
              <Link to={dashboardRoute}>
                <HouseDoorFill />
                Dashboard
              </Link>
            </li>


            <li>
              <Link to={profileRoute}>
                <PersonFill />
                Profile
              </Link>
            </li>


            <li>
              <Link to="/jobs">
                <BriefcaseFill />
                Jobs
              </Link>
            </li>


            <li>
              <Link to="/events">
                <CalendarEventFill />
                Events
              </Link>
            </li>


            <li>
              <Link to="/forum">
                <ChatDotsFill />
                Forum
              </Link>
            </li>


            <li>
              <Link
                to={
                  role === "student"
                    ? "/chat/start"
                    : "/chat"
                }
              >
                <ChatLeftDotsFill />
                Chat
              </Link>
            </li>


            <li>
              <Link to="/rewards">
                <TrophyFill />
                Rewards
              </Link>
            </li>


            <li>
              <Link to="/feedback">
                <StarFill />
                Feedback
              </Link>
            </li>


            <li>
                <button
                    className="sidebar-link-btn"
                    onClick={() => {
                        navigate("/");
                        
                        setTimeout(() => {
                            document.getElementById("contact")?.scrollIntoView({
                                behavior: "smooth"
                            });
                        }, 100);
                    }}
                >
                    <EnvelopeFill />
                    Contact
                </button>
            </li>
          </ul>

        )}

      </div>


      {/* ================= LOGOUT ================= */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >

        <BoxArrowRight />

        Logout

      </button>

    </div>

  );

}


export default Sidebar;