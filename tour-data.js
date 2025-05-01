const tours = [
  {
    id: "01",
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
    featured: true,
    avgRating: 4.65
  },
  {
    id: "02",
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
    featured: true,
    avgRating: 4.9
  },
  {
    id: "03",
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
    featured: true,
    avgRating: 4.7
  },
  {
    id: "04",
    title: "Beautiful Sunrise, Thailand",
    city: "Bangkok",
    address: "Khao Yai National Park, Thailand",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Witness the breathtaking sunrise over the mountains of Thailand",
    reviews: [
      {
        name: "David Lee",
        rating: 4.8,
        comment: "Spectacular sunrise views"
      }
    ],
    photo: "/tour-images/tour-img04.jpg",
    featured: true,
    avgRating: 4.8
  },
  {
    id: "05",
    title: "Nusa Pendia Bali",
    city: "Bali",
    address: "Nusa Penida, Bali, Indonesia",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Discover the hidden gems of Nusa Penida with its pristine beaches and crystal clear waters",
    reviews: [
      {
        name: "Lisa Chen",
        rating: 4.9,
        comment: "Paradise on earth"
      }
    ],
    photo: "/tour-images/tour-img05.jpg",
    featured: true,
    avgRating: 4.9
  },
  {
    id: "06",
    title: "Cherry Blossoms Spring",
    city: "Tokyo",
    address: "Shinjuku Gyoen, Tokyo, Japan",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Experience the magical cherry blossom season in Japan's most beautiful gardens",
    reviews: [
      {
        name: "Yuki Tanaka",
        rating: 4.7,
        comment: "Magical experience"
      }
    ],
    photo: "/tour-images/tour-img06.jpg",
    featured: true,
    avgRating: 4.7
  },
  {
    id: "07",
    title: "Holmen Lofoten",
    city: "Lofoten",
    address: "Lofoten Islands, Norway",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Explore the stunning fjords and fishing villages of the Lofoten Islands",
    reviews: [
      {
        name: "Erik Johansen",
        rating: 4.8,
        comment: "Breathtaking landscapes"
      }
    ],
    photo: "/tour-images/tour-img07.jpg",
    featured: true,
    avgRating: 4.8
  },
  {
    id: "08",
    title: "Snowy Mountains, Thailand",
    city: "Bangkok",
    address: "Doi Inthanon, Chiang Mai, Thailand",
    distance: 500,
    price: 35999,
    maxGroupSize: 8,
    desc: "Experience the winter wonderland of Thailand's highest peak",
    reviews: [
      {
        name: "Anna Park",
        rating: 4.6,
        comment: "Unique winter experience"
      }
    ],
    photo: "/tour-images/tour-img08.jpg",
    featured: true,
    avgRating: 4.6
  }
];

module.exports = tours; 