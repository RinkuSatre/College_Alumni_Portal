import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Profile.css";

function AlumniProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    full_name: "",
    prn_number: "",
    passout_year: "",
    company_name: "",
    job_title: "",
    experience: "",
    current_city: "",
    linkedin: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("profiles/alumni/");

      setProfile({
        full_name: response.data.full_name || "",
        prn_number: response.data.prn_number || "",
        passout_year: response.data.passout_year || "",
        company_name: response.data.company_name || "",
        job_title: response.data.job_title || "",
        experience: response.data.experience || "",
        current_city: response.data.current_city || "",
        linkedin: response.data.linkedin || "",
        phone: response.data.phone || "",
        bio: response.data.bio || "",
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
      await API.put("profiles/alumni/", profile);

      alert("Profile Updated Successfully ✅");

      fetchProfile();

      setIsEditing(false);
    } catch (error) {
      console.log("PUT Error:", error.response?.data);
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
              src="https://ui-avatars.com/api/?name=Alumni&background=1565c0&color=fff&size=200"
              alt="Profile"
            />

            <h2>{user?.username}</h2>

            <p>Alumni</p>
          </div>

          {!isEditing ? (
            <div className="profile-details">

              <div className="detail-row">
                <span>Full Name</span>
                <strong>{profile.full_name || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>PRN Number</span>
                <strong>{profile.prn_number || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Passout Year</span>
                <strong>{profile.passout_year || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Company</span>
                <strong>{profile.company_name || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Job Title</span>
                <strong>{profile.job_title || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Experience</span>
                <strong>{profile.experience || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Current City</span>
                <strong>{profile.current_city || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>LinkedIn</span>
                <strong>{profile.linkedin || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Phone</span>
                <strong>{profile.phone || "-"}</strong>
              </div>

              <div className="detail-row">
                <span>Bio</span>
                <strong>{profile.bio || "-"}</strong>
              </div>

              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>

            </div>
          ) : (
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
                type="number"
                name="passout_year"
                placeholder="Passout Year"
                value={profile.passout_year}
                onChange={handleChange}
              />

              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={profile.company_name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="job_title"
                placeholder="Job Title"
                value={profile.job_title}
                onChange={handleChange}
              />

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={profile.experience}
                onChange={handleChange}
              />

              <input
                type="text"
                name="current_city"
                placeholder="Current City"
                value={profile.current_city}
                onChange={handleChange}
              />

              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={profile.linkedin}
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
                name="bio"
                placeholder="Bio"
                value={profile.bio}
                onChange={handleChange}
              />

              <button
                className="edit-btn"
                onClick={handleSave}
              >
                Save Profile
              </button>

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AlumniProfile;