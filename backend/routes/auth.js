const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Amit_is_a_good_boy";

router.use(express.json());

// Create a user uisng: POST "/api/auth/cretaeUser" . Doesnt require Auth

router.post(
  "/createUser",
  [
    query("name", "Enter a valid Name").isLength({ min: 5 }),
    query("email", "Enter a vlid Email").isEmail(),
    query("password", "Enter a valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors retun bad request
    const result = validationResult(req);
    if (result.isEmpty()) {
      res.send({ errors: result.array() });
      return; //This was the cause of error
    }
    // Check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry the user with this email already exists" });
      }
      // hashing using salting
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);



// Authenticate a user: POST "/api/auth/login" .
router.post(
  "/login",
  [
    query("email", "Enter a vlid Email").isEmail(),
    query("password", "Password cannnot be Blank").exists(),
  ],
  async (req, res) => {
    // If there are bad requests return the error and the message of error
    const error = validationResult(req);
    if (error.isEmpty()) {
      res.send({ errors: error.array() });
      return; //This was the cause of error
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

module.exports = router;
