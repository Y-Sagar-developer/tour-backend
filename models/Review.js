import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
      required: true,

    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Review text must be at least 3 characters long"],
    },
    rating: {
      type: Number,
      required: true,
      // min: 0,
      // max: 5,
      // default: 0,
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


export default mongoose.model("Review", reviewSchema);
