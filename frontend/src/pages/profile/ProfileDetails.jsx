import React, { useState } from "react";
import axios from "axios";

const ProfileDetails = () => {
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file); // Store the actual file object
    }
  };

  // Handle username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle form submission (updating profile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);

    if (profilePicture) {
      formData.append("profilePic", profilePicture); // Append the file object, not the URL
    }

    try {
      const response = await axios.put("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });
      console.log("Profile updated:", response.data);
      // Handle success (e.g., show success message, redirect, etc.)
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Profile Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="profile-picture" className="block text-sm font-medium">
            Profile Picture
          </label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="mt-1 block w-full"
          />
          {profilePicture && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetails;
