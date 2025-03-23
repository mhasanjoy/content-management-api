const Content = require("../models/Content");
const User = require("../models/User");

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "bio"],
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

const getUserProfileForLoggedInUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "bio"],
      include: {
        model: Content,
        attributes: ["id", "title", "youtubeUrl", "publiclyViewable"],
        where: { userId: req.user.id },
        required: false, // in case the user has no content
        as: "contents",
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch profile" });
  }
};

const getUserProfileForPublic = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "bio"],
      include: {
        model: Content,
        attributes: ["id", "title", "youtubeUrl", "publiclyViewable"],
        where: { userId: req.params.id, publiclyViewable: true },
        required: false, // in case the user has no content
        as: "contents",
      },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch profile" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    // check if email is being updated
    if (email && email !== req.user.email) {
      // check if the new email is already in use
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res
          .status(400)
          .json({ success: false, message: "Email already in use" });
        return;
      }
    }

    // update the user's profile with name, email (if updated) and bio
    await User.update({ name, email, bio }, { where: { id: req.user.id } });

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

module.exports = {
  getAllUsers,
  getUserProfileForLoggedInUser,
  getUserProfileForPublic,
  updateUserProfile,
};
