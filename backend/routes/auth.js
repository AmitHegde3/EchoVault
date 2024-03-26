const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Importing the User model
const { query, validationResult } = require("express-validator"); // Importing validation utilities
const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing JWT for token generation
const fetchuser = require("../middleware/fetchuser") // Importing middleware for fetching user

const JWT_SECRET = "Amit_is_a_good_boy"; // Secret key for JWT signing

router.use(express.json()); // Using the JSON parser middleware

// Route 1: Create a user using: POST "/api/auth/createUser". Doesn't require Auth
router.post(
  "/createUser",
  [
    // Validation checks for name, email, and password
    query("name", "Enter a valid Name").isLength({ min: 5 }),
    query("email", "Enter a valid Email").isEmail(),
    query("password", "Enter a valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Validation result
    const result = validationResult(req);
    // If there are errors return bad request
    if (result.isEmpty()) {
      res.send({ errors: result.array() });
      return; // Return from the function
    }

    // Check whether the user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, the user with this email already exists" });
      }

      // Hashing the password using bcrypt for security
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Creating a new user in the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Generating JWT token for the newly created user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      // Sending back the JWT token as response
      res.json({ authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

// Route 2: Authenticate a user: POST "/api/auth/login"
router.post(
  "/login",
  [
    // Validation checks for email and password
    query("email", "Enter a valid Email").isEmail(),
    query("password", "Password cannot be Blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are bad requests return the error and the message of error
    const error = validationResult(req);
    if (error.isEmpty()) {
      res.send({ errors: error.array() });
      return; // Return from the function
    }

    const { email, password } = req.body;
    try {
      // Find the user by email
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({success, error: "Please try to login with correct credentials" });
      }

      // Generating JWT token for the authenticated user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      // Sending back the JWT token as response
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

// Route 3: Get logged in user details: POST "/api/auth/getuser". Login required
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    try {
      // Fetching user details from the request object (added by fetchuser middleware)
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
)

module.exports = router;
