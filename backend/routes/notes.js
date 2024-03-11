const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { query, validationResult } = require("express-validator");

// Route 1: Get all the notes using : GET "/api/auth/fetchallnotes" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
});

// Route 2: Add a new note using : POST "/api/auth/addnote" . Login required
router.post(
  "/addnote",
  fetchuser,
  [
    query("title", "Enter a valid Title").isLength({ min: 3 }),
    query("description", "Enter a valid Description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      if (result.isEmpty()) {
        res.send({ errors: result.array() });
        return; //This was the cause of error
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);

module.exports = router;
