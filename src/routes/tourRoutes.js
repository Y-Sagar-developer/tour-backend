const express = require('express');
const router = express.Router();
const localTours = require('../../tour-data.js');

// Get all tours
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const tours = localTours.slice(skip, skip + limit);
    const totalTours = localTours.length;

    res.json({
      success: true,
      count: totalTours,
      data: tours
    });
  } catch (err) {
    console.error('Error fetching tours:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tours'
    });
  }
});

// Get tour by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tour = localTours.find(t => t.id === id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found'
      });
    }

    res.json({
      success: true,
      data: tour
    });
  } catch (err) {
    console.error('Error fetching tour:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tour'
    });
  }
});

// Get tour by search
router.get('/search/getTourBySearch', async (req, res) => {
  const { city, maxGroupSize } = req.query;
  
  if (!maxGroupSize) {
    return res.status(400).json({ message: 'Max group size is required' });
  }

  try {
    let filteredTours = localTours.filter(tour => 
      tour.maxGroupSize >= parseInt(maxGroupSize)
    );

    if (city) {
      filteredTours = filteredTours.filter(tour => 
        tour.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    res.json({
      success: true,
      message: 'Tours found successfully',
      data: filteredTours
    });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tours'
    });
  }
});

// Get featured tours
router.get('/featured', async (req, res) => {
  try {
    const featuredTours = localTours.filter(tour => tour.featured);
    
    res.json({
      success: true,
      count: featuredTours.length,
      data: featuredTours
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured tours'
    });
  }
});

module.exports = router; 