const router = require("express").Router();
const Form = require("../models/Form");
router.post("/", async (req, res) => {
  const newForm = new Form({
    category: req.body.category,
    email: req.body.email,
    country: req.body.country,
    egift_number: req.body.egift_number,
  });
  try {
    const savedForm = await newForm.save();
    res.status(200).json(savedForm);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
