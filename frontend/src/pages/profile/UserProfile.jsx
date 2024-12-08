// pages/profile/UserProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useGetUserProfile } from "../../hooks/useGetUserProfile"; // Adjust the path if necessary
import toast from "react-hot-toast"; // If you're using react-hot-toast for notifications

const UserProfile = () => {
  const { userProfile, loading, error } = useGetUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleUpdateProfile = () => {
    // Redirect to the Update Profile page (adjust the route if needed)
    navigate("/update-profile"); // Navigate to the update profile route
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Send a request to delete the account
      const res = await fetch("/api/user/delete", { method: "DELETE" });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Handle successful account deletion
      toast.success("Account deleted successfully.");
      // Optionally redirect to another page or log the user out
      // Example: window.location.href = "/login";
    } catch (error) {
      toast.error("Error deleting account: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="profile-container w-full max-w-md mx-auto p-6">
        <h1 className="text-white text-3xl mb-4">User Profile</h1>
        {userProfile && (
          <div className="profile-details bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <img
              src={userProfile.profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-pic rounded-full mx-auto mb-4"
              width="150"
              height="150"
            />
            <p><strong>Full Name:</strong> {userProfile.fullName}</p>
            <p><strong>Username:</strong> {userProfile.username}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Gender:</strong> {userProfile.gender}</p>

            <div className="mt-6 space-x-4">
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              >
                Update Profile
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
