const mongoose = require('mongoose');
const Tour = require('../models/Tour');
const tours = [
  {
    title: "Westminister Bridge",
    city: "London",
    address: "Westminster, London SW1A 2JR, UK",
    distance: 300,
    price: 89999,
    maxGroupSize: 10,
    desc: "Iconic bridge offering stunning views of the London skyline and the Houses of Parliament",
    reviews: [
      {
        name: "John Smith",
        rating: 4.8,
        comment: "Amazing views of the city!"
      },
      {
        name: "Emma Wilson",
        rating: 4.5,
        comment: "Great photo opportunities"
      }
    ],
    photo: "/tour-images/tour-img01.jpg",
    featured: true
  },
  {
    title: "Bali, Indonesia",
    city: "Bali",
    address: "Ubud, Bali, Indonesia",
    distance: 400,
    price: 45999,
    maxGroupSize: 8,
    desc: "Experience the rich culture and beautiful landscapes of Bali's most famous destinations",
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 4.9,
        comment: "Absolutely breathtaking!"
      }
    ],
    photo: "/tour-images/tour-img02.jpg",
    featured: true
  },
  {
    title: "Snowy Mountains, Thailand",
    city: "Bangkok",
    address: "Doi Inthanon, Chiang Mai, Thailand",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Explore the highest peak in Thailand with its stunning mountain views and unique flora",
    reviews: [
      {
        name: "Michael Brown",
        rating: 4.7,
        comment: "Unforgettable experience"
      }
    ],
    photo: "/tour-images/tour-img03.jpg",
    featured: true
  }
];

const seedTours = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/tour-management');
    console.log('Connected to MongoDB');

    // Clear existing tours
    await Tour.deleteMany({});
    console.log('Cleared existing tours');

    // Insert new tours
    await Tour.insertMany(tours);
    console.log('Successfully seeded tours');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding tours:', error);
    process.exit(1);
  }
};

seedTours(); 