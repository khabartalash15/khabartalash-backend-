import Admin from "../models/AdminModel.js";
import generateToken from "../utils/generateToken.js";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      generateToken(res, admin._id);
      res.status(200).json({
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Some error occured while admin sign-in",
    });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Admin logged out",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occured while admin sign-out",
    });
  }
};

export { loginAdmin, logoutAdmin };
