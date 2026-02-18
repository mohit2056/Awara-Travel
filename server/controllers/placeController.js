const Place = require('../models/Place');

// ======================================================
// 🛠️ Controller 1: Database Seed (Clear DB - Only Admin Use Ideally)
// ======================================================
const seedDatabase = async (req, res) => {
  try {
    // Safety: Ise comment kar sakte ho agar galti se delete nahi karna chahte
    // await Place.deleteMany({}); 
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

    // 1. Hidden Gem Filter
    if (type === 'hidden') {
      filter.isHiddenGem = true;
    }

    // 2. Search Logic (Safe Regex)
    if (search) {
      console.log("🔍 Searching for:", search);
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

    // 👇 POPULATE HATA DIYA (Kyuki agar owner ID exist nahi karti to crash hota hai)
    // Sort by _id: -1 (Newest first)
    const places = await Place.find(filter).sort({ _id: -1 });
    
    console.log(`🎉 Found ${places.length} places.`);
    res.json(places);

  } catch (error) {
    console.error("❌ SERVER ERROR in getPlaces:", error);
    res.status(500).json({ error: "Server Error Fetching Places" });
  }
};

// ======================================================
// 🛠️ Controller 3: Single Place by ID (CRASH PROOF 🛡️)
// ======================================================
const getPlaceById = async (req, res) => {
  try {
    // 👇 Populate hata diya taaki 500 error na aaye agar owner missing ho
    const place = await Place.findById(req.params.id);
    
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }
    
    res.json(place);
  } catch (error) {
    console.error("❌ SERVER ERROR in getPlaceById:", error);
    // Agar ID format galat hai to 404, warna 500
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: "Place not found" });
    }
    res.status(500).json({ error: "Server Error Fetching Place Details" });
  }
};

// ======================================================
// 🛠️ Controller 4: Create Place (FLEXIBLE ✨)
// ======================================================
const createPlace = async (req, res) => {
  try {
    const { title, location, description, price, image, isHiddenGem, lat, lng, food } = req.body;

    // Basic Validation
    if (!title || !location || !price) {
      return res.status(400).json({ message: "Name, Location and Price are required" });
    }

    const foodArray = food ? food.split(',').map(item => item.trim()) : [];

    // Flexible Data Structure (Dono fields bhar rahe hain safety ke liye)
    const newPlace = new Place({
      name: title,
      title: title, // Backup
      
      location: location,
      description: description || "No description provided",
      
      avgCost: Number(price),
      price: Number(price), // Backup
      
      images: [image],
      photos: [image], // Backup
      image: image,    // Backup
      
      isHiddenGem: isHiddenGem || false,
      
      coordinates: { 
        lat: Number(lat) || 28.6139, 
        lng: Number(lng) || 77.2090 
      },
      
      moodTags: ["Explore", "New"],
      mustTryDishes: foodArray,
      category: "General",
      
      // Owner link kar rahe hain agar user logged in hai
      owner: req.user ? req.user._id : null 
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);

  } catch (error) {
    console.error("Create Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// ======================================================
// 🎲 Controller 5: Random Place (Blind Date)
// ======================================================
const getRandomPlace = async (req, res) => {
  const { budget } = req.query;

  try {
    let filter = {};
    if (budget) {
        // avgCost check karega (aur backup price field bhi agar schema me alias hai)
        filter.avgCost = { $lte: Number(budget) };
    }

    const places = await Place.find(filter);

    if (places.length === 0) {
      return res.status(404).json({ message: "No places found in this budget! 😅" });
    }

    const randomIndex = Math.floor(Math.random() * places.length);
    res.json(places[randomIndex]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// ⭐ Controller 6: Reviews
// ======================================================
const createPlaceReview = async (req, res) => {
  const { rating, comment } = req.body;
  const user = req.user; 

  if (!user) return res.status(401).json({ message: "Login kar bhai pehle!" });

  try {
    const place = await Place.findById(req.params.id);

    if (place) {
      const alreadyReviewed = place.reviews.find(
        (r) => r.user && r.user.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        alreadyReviewed.rating = Number(rating);
        alreadyReviewed.comment = comment;
      } else {
        const review = {
          name: user.username || "Traveler",
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