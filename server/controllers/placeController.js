const Place = require('../models/Place');

// 🛠️ Controller 1: Database Seed karna (Clear DB)
const seedDatabase = async (req, res) => {
  try {
    await Place.deleteMany({}); 
    res.json({ message: "✅ Database Cleared! Ab sab saaf hai." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🛠️ Controller 2: Places fetch karna (SEARCH & FILTER LOGIC)
const getPlaces = async (req, res) => {
  try {
    const { type, search } = req.query;
    let filter = {};

    // 1. Hidden Gem Filter
    if (type === 'hidden') {
      filter.isHiddenGem = true;
    }

    // 2. Search Logic (Name, Location, Description, Food, Tags sab check karega)
    if (search) {
      console.log("Searching for:", search);
      filter.$or = [
        { name: { $regex: search, $options: 'i' } }, // Case insensitive
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { mustTryDishes: { $regex: search, $options: 'i' } }, // Food search 🥘
        { moodTags: { $regex: search, $options: 'i' } } // Vibe search ✨
      ];
    }

    const places = await Place.find(filter);
    console.log(`Found ${places.length} places`);
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// 🛠️ Controller 3: Single Place fetch karna
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found." });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🛠️ Controller 4: Create Place (Admin)
const createPlace = async (req, res) => {
  try {
    const { title, location, description, price, image, isHiddenGem, lat, lng, food } = req.body;

    if (!title || !location || !description || !price || !lat || !lng) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Comma wale text ko Array banana
    const foodArray = food ? food.split(',').map(item => item.trim()) : [];

    const newPlace = new Place({
      name: title,
      location: location,
      description: description,
      avgCost: Number(price),
      images: [image], // Array mein save hoga
      isHiddenGem: isHiddenGem,
      coordinates: { 
        lat: Number(lat), 
        lng: Number(lng) 
      },
      moodTags: ["Explore"], // Default tag
      mustTryDishes: foodArray 
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// 🎲 Controller 5: BLIND DATE (Random Place)
const getRandomPlace = async (req, res) => {
  const { budget } = req.query;

  try {
    let filter = {};
    if (budget) {
        filter.avgCost = { $lte: Number(budget) };
    }

    const places = await Place.find(filter);

    if (places.length === 0) {
      return res.status(404).json({ message: "Budget thoda tight hai, kuch aur try karo! 😅" });
    }

    const randomIndex = Math.floor(Math.random() * places.length);
    const randomPlace = places[randomIndex];

    res.json(randomPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ Controller 6: Create or Update Review
const createPlaceReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user = req.user; // Auth middleware se aayega

  if (!user) return res.status(401).json({ message: "Login kar bhai pehle!" });

  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      const alreadyReviewed = place.reviews.find(
        (r) => r.user.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        alreadyReviewed.rating = Number(rating);
        alreadyReviewed.comment = comment;
      } else {
        const review = {
          name: user.username || "User",
          rating: Number(rating),
          comment,
          user: user._id,
        };
        place.reviews.push(review);
        place.numReviews = place.reviews.length;
      }

      place.rating =
        place.reviews.reduce((acc, item) => item.rating + acc, 0) /
        place.reviews.length;

      await place.save();
      res.status(201).json({ message: 'Review Added/Updated' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ EXPORTS
module.exports = { 
    seedDatabase, 
    getPlaces, 
    getPlaceById, 
    createPlace, 
    getRandomPlace,
    createPlaceReview 
};