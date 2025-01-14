import News from "../models/newsModel.js";
import { formatDate, capitalizeFirstLetter } from "../utils/helpers.js";
const createNews = async (req, res) => {
  try {
    const { title, imageUrl, description, category } = req.body;

    const date = formatDate(new Date());

    if (!title || !imageUrl || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const capitalizedTitle = capitalizeFirstLetter(title);
    const capitalizedDescription = capitalizeFirstLetter(description);
    const capitalizedCategory = capitalizeFirstLetter(category);

    const newNews = await News.create({
      title: capitalizedTitle,
      imageUrl,
      description: capitalizedDescription,
      category: capitalizedCategory,
      date: date,
    });

    if (newNews) {
      res.status(200).json({
        success: true,
        newNews,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while creating news",
    });
  }
};

const getPaginatedNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;

    const pageNumber = Math.max(1, parseInt(page));
    const limitNumber = Math.max(1, parseInt(limit));

    const skip = (pageNumber - 1) * limitNumber;

    let query = {};

    // If a category is provided and it's not "all", filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Fetch the filtered news based on query
    const newsList = await News.find(query).skip(skip).limit(limitNumber);

    // Count the total number of news items matching the query
    const totalNews = await News.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: newsList,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalNews / limitNumber),
      totalItems: totalNews,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occurred while getting paginated news",
    });
  }
};

const getSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (news) {
      res.status(200).json({
        success: true,
        news,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occured while getting single news",
    });
  }
};

const updateSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (news) {
      news.title = req.body.title || news.title;
      news.imageUrl = req.body.imageUrl || news.imageUrl;
      news.description = req.body.description || news.description;
      news.category = req.body.category || news.category;
    }

    const updatedNews = await news.save();

    res.status(200).json({
      _id: updatedNews._id,
      title: updatedNews.title,
      imageUrl: updatedNews.imageUrl,
      description: updatedNews.description,
      category: updatedNews.category,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occured while updating news",
    });
  }
};

const deleteSingleNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (news) {
      await news.deleteOne().exec();
      res.status(200).json({ success: true, message: "News deleted" });
    } else {
      res.status(404).json({ success: false, message: "News not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Some error occured while deleting the news",
    });
  }
};
export {
  createNews,
  getPaginatedNews,
  getSingleNews,
  updateSingleNews,
  deleteSingleNews,
};
