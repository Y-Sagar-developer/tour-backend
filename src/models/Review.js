const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true
    },
    reviewText: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minlength: [1, "Review text must be at least 1 character long"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
  },
  { timestamps: true }
);

// Add pre-save middleware to handle data validation
reviewSchema.pre('save', function(next) {
  if (typeof this.rating === 'string') {
    this.rating = parseInt(this.rating);
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
