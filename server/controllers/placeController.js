const Place = require('../models/Place');

// ======================================================
// 🛠️ Controller 1: Database Seed
// ======================================================
const seedDatabase = async (req, res) => {
  try {
    res.json({ message: "Seed disabled for safety on live server." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================================================
// 🛠️ Controller 2: Places Fetch (CRASH PROOF 🛡️)
// ======================================================
const getPlaces = async (req, res) => {
  try {
    const { type, search } = req.query;
    let filter = {};

    if (type === 'hidden') { filter.isHiddenGem = true; }

    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      filter.$or = [
        { name: searchRegex },
        { location: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { moodTags: searchRegex },
        { mustTryDishes: searchRegex }
      ];
    }

    // Latest places sabse upar
    const places = await Place.find(filter).sort({ _id: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Server Error Fetching Places" });
  }
};

// ======================================================
// 🛠️ Controller 3: Single Place by ID
// ======================================================
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found." });
    res.json(place);
  } catch (error) {
    if (error.kind === 'ObjectId') return res.status(404).json({ message: "Place not found" });
    res.status(500).json({ error: "Server Error" });
  }
};

// ======================================================
// 🛠️ Controller 4: Create Place (FLEXIBLE ✨)
// ======================================================
const createPlace = async (req, res) => {
  try {
    const { title, location, description, price, image, isHiddenGem, lat, lng, food } = req.body;

    if (!title || !location || !price) {
      return res.status(400).json({ message: "Name, Location and Price are required" });
    }

    const foodArray = food ? food.split(',').map(item => item.trim()) : [];

    const newPlace = new Place({
      name: title,
      title: title, 
      location: location,
      description: description || "Explore this amazing destination!",
      avgCost: Number(price),
      price: Number(price), 
      images: [image],
      photos: [image],
      image: image,
      isHiddenGem: isHiddenGem || false,
      coordinates: { 
        lat: Number(lat) || 28.6139, 
        lng: Number(lng) || 77.2090 
      },
      moodTags: ["Explore", "Nature"],
      mustTryDishes: foodArray,
      category: "General",
      owner: req.user ? req.user._id : null 
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// 🎲 Controller 5: Random Place
// ======================================================
const getRandomPlace = async (req, res) => {
  try {
    const { budget } = req.query;
    let filter = budget ? { avgCost: { $lte: Number(budget) } } : {};
    const places = await Place.find(filter);

    if (places.length === 0) return res.status(404).json({ message: "Budget thoda badhao bhai! 😅" });

    const randomPlace = places[Math.floor(Math.random() * places.length)];
    res.json(randomPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// ⭐ Controller 6: Reviews
// ======================================================
const createPlaceReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const place = await Place.findById(req.params.id);

    if (place) {
      const alreadyReviewed = place.reviews.find(r => r.user && r.user.toString() === req.user._id.toString());
      if (alreadyReviewed) {
        alreadyReviewed.rating = Number(rating);
        alreadyReviewed.comment = comment;
      } else {
        place.reviews.push({
          name: req.user.username || "Traveler",
          rating: Number(rating),
          comment,
          user: req.user._id,
        });
        place.numReviews = place.reviews.length;
      }
      place.rating = place.reviews.reduce((acc, item) => item.rating + acc, 0) / place.reviews.length;
      await place.save();
      res.status(201).json({ message: 'Review Submitted' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { seedDatabase, getPlaces, getPlaceById, createPlace, getRandomPlace, createPlaceReview };