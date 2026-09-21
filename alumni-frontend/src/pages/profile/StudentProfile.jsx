import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";
import "./Profile.css";

function StudentProfile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [profile, setProfile] = useState({
    full_name: "",
    prn_number: "",
    department: "",
    course: "",
    year: "",
    phone: "",
    address: "",
    profile_photo: "",
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
        profile_photo: response.data.profile_photo || "",
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

  // Profile photo select
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5 MB.");
      return;
    }

    setSelectedPhoto(file);

    // Preview
    setProfile({
      ...profile,
      profile_photo: URL.createObjectURL(file),
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("full_name", profile.full_name);
      formData.append("prn_number", profile.prn_number);
      formData.append("department", profile.department);
      formData.append("course", profile.course);
      formData.append("year", profile.year);
      formData.append("phone", profile.phone);
      formData.append("address", profile.address);

      // Add photo only if new photo selected
      if (selectedPhoto) {
        formData.append("profile_photo", selectedPhoto);
      }

      await API.put("profiles/student/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile Updated Successfully ✅");

      setSelectedPhoto(null);

      await fetchProfile();
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

          {/* PROFILE HEADER */}
          <div className="profile-header">

            <div className="profile-photo-wrapper">

              <img
                src={
                  profile.profile_photo
                    ? profile.profile_photo
                    : "https://ui-avatars.com/api/?name=Student&background=1565c0&color=fff&size=200"
                }
                alt="Profile"
                className="profile-photo"
              />

              <label
                htmlFor="student-profile-photo"
                className="photo-upload-btn"
              >
                📷 Change Photo
              </label>

              <input
                id="student-profile-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />

            </div>

            <h2>{user?.username}</h2>

            <p>Student</p>
          </div>

          {/* PROFILE FORM */}
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