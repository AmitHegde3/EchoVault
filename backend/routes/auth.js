const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { query, validationResult } = require("express-validator");

router.use(express.json());
// Create a user uisng: POST "/api/auth/" . Doesnt require Auth

router.post(
  "/",
  [
    query("name", "Enter a valid Name").isLength({ min: 5 }),
    query("email", "Enter a vlid Email").isEmail(),
    query("password", "Enter a valid Password").isLength({ min: 5 }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      res.send({ errors: result.array() });
      return; //This was thnecause of error
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
    console.log(req.body);
    //   res.send(req.body);
  }
);

module.exports = router;
