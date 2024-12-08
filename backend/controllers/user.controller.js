import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Assuming req.user contains _id

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming req.user contains userId
    const { username } = req.body; // Username from form data
    let profilePic = req.file ? req.file.path : null; // Profile picture path if uploaded

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profilePic }, // Update fields
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user data
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    // Get user id from the token or session
    const userId = req.user._id; // Ensure using the correct property (_id)
    const user = await User.findById(userId).select("-password"); // Don't return the password

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user); // Return the user profile
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};
