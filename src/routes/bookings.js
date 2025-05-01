const express = require("express");
const { verifyToken, verifyUser } = require("../utils/verifyToken");
const { createBooking, getBooking, getAllBooking, deleteBooking } = require("../controller/bookingController");

const router = express.Router();

// Log all booking requests
router.use((req, res, next) => {
  console.log('Booking request:', {
    method: req.method,
    path: req.path,
    body: req.body,
    headers: req.headers
  });
  next();
});

router.post("/", verifyToken, createBooking);
router.get("/", verifyToken, getAllBooking);
router.get("/:id", verifyToken, getBooking);
router.delete("/:id", verifyUser, deleteBooking);

module.exports = router;
