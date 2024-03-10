const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { query, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');


const JWT_SECRET = 'Amit is a good boy'

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
      res.json(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
