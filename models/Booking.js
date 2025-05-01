const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true, 
    },
    guestSize: {
      type: Number,
      required: true,
      min: 1,
    },
    phone: {
      type: String,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Add pre-save middleware to handle type conversion
bookingSchema.pre('save', function(next) {
  if (typeof this.guestSize === 'string') {
    this.guestSize = parseInt(this.guestSize);
  }
  if (typeof this.phone === 'number') {
    this.phone = this.phone.toString();
  }
  if (typeof this.bookAt === 'string') {
    this.bookAt = new Date(this.bookAt);
  }
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
