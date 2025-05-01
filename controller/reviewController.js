import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  // const newReview = new Review({ ...req.body });
  try {
     // Validate tour exists
     const tour = await Tour.findById(tourId);
     if (!tour) {
       return res.status(404).json({
         success: false,
         message: "Tour not found"
       });
     }
 
     // Create new review with tour ID
     const newReview = new Review({
       ...req.body,
       productId: tourId
     });
 
    const savedReview = await newReview.save();

    //after creating a new review now update the reviews array of the tour

    await Tour.findByIdAndUpdate(tourId, {
      // $push: { reviews: savedReview._id },
      $push: { reviews: savedReview._id }

    });
    // res
      // .status(200)
      // .json({ success: true, message: "Review submited", data: savedReview });
      res.status(200).json({
        success: true,
        message: "Review submitted successfully",
        data: savedReview
      });
  
  } catch (err) {
    // res.status(500).json({ success: false, message: "failed to  submit" });

    console.error("Review submission error:", err);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(err.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: err.message
    });
  }
};
