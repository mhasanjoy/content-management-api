const Content = require("../models/Content");

const createContent = async (req, res) => {
  try {
    const { title, youtubeUrl, publiclyViewable } = req.body;

    const newContent = await Content.create({
      userId: req.user.id,
      title,
      youtubeUrl,
      publiclyViewable: publiclyViewable || true,
    });

    res.status(201).json({
      success: true,
      message: "Content created successfully",
      data: newContent,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Content creation failed" });
  }
};

const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { title, youtubeUrl, publiclyViewable } = req.body;

    const content = await Content.findByPk(contentId);

    if (!content) {
      res.status(404).json({ success: false, message: "Content not found" });
      return;
    }

    // check if the logged-in user is the owner of the content
    if (content.userId !== req.user.id) {
      res.status(403).json({ success: false, message: "Access denied" });
      return;
    }

    // update the content
    await content.update({
      title: title || content.title,
      youtubeUrl: youtubeUrl || content.youtubeUrl,
      publiclyViewable:
        publiclyViewable !== undefined
          ? publiclyViewable
          : content.publiclyViewable,
    });

    res.status(200).json({
      success: true,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Content update failed" });
  }
};

const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;

    const content = await Content.findByPk(contentId);

    if (!content) {
      res.status(404).json({ success: false, message: "Content not found" });
      return;
    }

    // check if the logged-in user is the owner of the content
    if (content.userId !== req.user.id) {
      res.status(403).json({ success: false, message: "Access denied" });
      return;
    }

    // delete the content
    await content.destroy();

    res
      .status(200)
      .json({ success: true, message: "Content deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Content deletion failed" });
  }
};

module.exports = {
  createContent,
  updateContent,
  deleteContent,
};
