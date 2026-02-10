const Place = require('../models/Place');

// 🛠️ Controller 1: Database Seed karna
const seedDatabase = async (req, res) => {
  try {
    await Place.deleteMany({});
    const places = [
      {
        name: "Varkala Cliff",
        description: "India ka apna Bali. Red cliffs aur samundar ka anokha sangam.",
        location: "Kerala",
        coordinates: { lat: 8.7379, lng: 76.7163 },
        images: ["https://plus.unsplash.com/premium_photo-1697729600773-4b616794695b?q=80&w=2070&auto=format&fit=crop"],
        moodTags: ["Peace", "Romantic"],
        isHiddenGem: true,
        avgCost: 8000, // ✅ Hum 'avgCost' use kar rahe hain
        musicUrl: "https://actions.google.com/sounds/v1/nature/ocean_waves_lapping.ogg",
        mustTryDishes: ["Prawn Curry", "Coconut Water"],
      },
      {
        name: "Baga Beach",
        description: "Full party vibes, loud music, aur crowd. Shanti yahan nahi milegi.",
        location: "Goa",
        coordinates: { lat: 15.5553, lng: 73.7517 },
        images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2"],
        moodTags: ["Party", "Thrill"],
        isHiddenGem: false,
        avgCost: 15000,
        musicUrl: "https://actions.google.com/sounds/v1/foley/rhythmic_drums.ogg",
        mustTryDishes: ["Goan Fish Curry", "Feni"],
      },
      {
        name: "Jibhi",
        description: "Himachal ka chupa hua heera. Lakdi ke ghar aur behosh kar dene wali shanti.",
        location: "Himachal Pradesh",
        coordinates: { lat: 31.6346, lng: 77.3491 },
        images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"],
        moodTags: ["Peace", "Thrill", "Spiritual"],
        isHiddenGem: true,
        avgCost: 6000,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        mustTryDishes: ["Siddu", "Trout Fish", "Thukpa"],
      },
      {
        name: "Shimla Mall Road",
        description: "Classic hill station lekin ab bahut bheed hoti hai.",
        location: "Himachal Pradesh",
        coordinates: { lat: 31.1048, lng: 77.1734 },
        images: ["https://images.unsplash.com/photo-1562649846-ab413ca01712"],
        moodTags: ["Romantic", "Family"],
        isHiddenGem: false,
        avgCost: 10000,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        mustTryDishes: ["Momos", "Coffee"],
      }
    ];

    await Place.insertMany(places);
    res.json({ message: "✅ Database seeded! Siddu is ready in Jibhi." });
  } catch (error) {
    res.status(500).json({ error: "Error: " + error.message });
  }
};

// 🛠️ Controller 2: Places fetch karna (SEARCH LOGIC HERE)
const getPlaces = async (req, res) => {
  try {
    const { type, search } = req.query;
    let filter = {};

    // Filter Logic
    if (type === 'hidden') {
      filter.isHiddenGem = true;
    }

    // 🔍 SEARCH LOGIC
    if (search) {
      console.log("Searching for:", search);
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { mustTryDishes: { $regex: search, $options: 'i' } }
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
    if (!place) return res.status(404).json({ message: "We are still finalizing the spot." });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🛠️ Controller 4: Create Place (JO MISSING THA) 🚨
const createPlace = async (req, res) => {
    try {
      const newPlace = new Place(req.body);
      const savedPlace = await newPlace.save();
      res.status(201).json(savedPlace);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

// 🎲 Controller 5: BLIND DATE (Random Place)
const getRandomPlace = async (req, res) => {
  const { budget } = req.query;

  try {
    // 1. Budget Filter
    // ⚠️ IMPORTANT FIX: 'price' ki jagah 'avgCost' use kiya kyunki database mein wahi hai
    const places = await Place.find({ avgCost: { $lte: Number(budget) } });

    if (places.length === 0) {
      return res.status(404).json({ message:"This is a bit of a tight budget we will need more resources to make it work.😅"});
    }

    // 2. Random Selection
    const randomIndex = Math.floor(Math.random() * places.length);
    const randomPlace = places[randomIndex];

    // 3. Send Response
    res.json(randomPlace);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ⭐ Create or Update Review
const createPlaceReview = async (req, res) => {
  const { rating, comment } = req.body;
  const place = await Place.findById(req.params.id);

  if (place) {
    // Check karo agar user ne pehle review diya hai (Edit Mode)
    const alreadyReviewed = place.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      // Update Old Review
      alreadyReviewed.rating = Number(rating);
      alreadyReviewed.comment = comment;
    } else {
      // Create New Review
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      place.reviews.push(review);
      place.numReviews = place.reviews.length;
    }

    // Average Rating Calculation (Maths Magic 🧮)
    place.rating =
      place.reviews.reduce((acc, item) => item.rating + acc, 0) /
      place.reviews.length;

    await place.save();
    res.status(201).json({ message: 'Review Added/Updated' });
  } else {
    res.status(404).json({ message: 'Place not found' });
  }
};

// ⚠️ IMPORTANT: module.exports add 'createPlaceReview' 

// ✅ Export mein 'createPlace' add kiya
module.exports = { seedDatabase, getPlaces, getPlaceById, createPlace, getRandomPlace,createPlaceReview };