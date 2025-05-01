const express = require('express');
const router = express.Router();
const { createReview } = require('../controller/reviewController');

// Create a review
router.post("/:id", async (req, res) => {
  const tourId = req.params.id;
  console.log('Review route - Tour ID:', tourId);
  console.log('Review route - Request body:', req.body);
  
  try {
    await createReview(req, res);
  } catch (err) {
    console.error('Review route error:', err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
});

module.exports = router;