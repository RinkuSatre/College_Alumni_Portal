import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Profile.css";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    full_name: "",
    prn_number: "",
    department: "",
    course: "",
    year: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("profiles/student/");

      setProfile({
        full_name: response.data.full_name || "",
        prn_number: response.data.prn_number || "",
        department: response.data.department || "",
        course: response.data.course || "",
        year: response.data.year || "",
        phone: response.data.phone || "",
        address: response.data.address || "",
      });
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await API.put("profiles/student/", profile);

      alert("Profile Updated Successfully ✅");

      fetchProfile();
    } catch (error) {
      console.log("PUT Error:", error);
      alert("Profile Update Failed ❌");
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://ui-avatars.com/api/?name=Student&background=1565c0&color=fff&size=200"
              alt="Profile"
            />

            <h2>{user?.username}</h2>

            <p>Student</p>
          </div>

          <div className="profile-form">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={profile.full_name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="prn_number"
              placeholder="PRN Number"
              value={profile.prn_number}
              onChange={handleChange}
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={profile.department}
              onChange={handleChange}
            />

            <input
              type="text"
              name="course"
              placeholder="Course"
              value={profile.course}
              onChange={handleChange}
            />

            <input
              type="number"
              name="year"
              placeholder="Year"
              value={profile.year}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={profile.phone}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={profile.address}
              onChange={handleChange}
            />

            <button
              className="edit-btn"
              onClick={handleSave}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;