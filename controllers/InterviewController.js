import Interview from "../models/interviewModel.js"; // Adjust the import path as per your project structure
import { formatDate, capitalizeFirstLetter } from "../utils/helpers.js";

const createInterview = async (req, res) => {
  try {
    const { title, videoLink, description } = req.body;

    const date = formatDate(new Date());

    const capitalizedTitle = capitalizeFirstLetter(title);
    const capitalizedDescription = capitalizeFirstLetter(description);

    if (!title || !videoLink || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const newInterview = await Interview.create({
      title: capitalizedTitle,
      videoLink,
      description: capitalizedDescription,
      date,
    });

    if (newInterview) {
      res.status(200).json({
        success: true,
        newInterview,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while creating the interview",
    });
  }
};

const getPaginatedInterviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.max(1, parseInt(limit));

    const skip = (pageNumber - 1) * limitNumber;

    // Fetch interviews sorted by the latest createdAt
    const interviewList = await Interview.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(limitNumber);

    const totalInterviews = await Interview.countDocuments();

    return res.status(200).json({
      success: true,
      data: interviewList,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalInterviews / limitNumber),
      totalItems: totalInterviews,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while getting paginated interviews",
    });
  }
};

const getSingleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);

    if (interview) {
      res.status(200).json({
        success: true,
        interview,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while getting the interview",
    });
  }
};

const updateSingleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);

    if (interview) {
      interview.title = req.body.title || interview.title;
      interview.videoLink = req.body.videoLink || interview.videoLink;
      interview.description = req.body.description || interview.description;

      const updatedInterview = await interview.save();

      res.status(200).json({
        _id: updatedInterview._id,
        title: updatedInterview.title,
        videoLink: updatedInterview.videoLink,
        description: updatedInterview.description,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while updating the interview",
    });
  }
};

const deleteSingleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findById(id);

    if (interview) {
      await interview.deleteOne();
      res.status(200).json({ success: true, message: "Interview deleted" });
    } else {
      res.status(404).json({ success: false, message: "Interview not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while deleting the interview",
    });
  }
};

export {
  createInterview,
  getPaginatedInterviews,
  getSingleInterview,
  updateSingleInterview,
  deleteSingleInterview,
};
