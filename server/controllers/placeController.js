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
        avgCost: 8000,
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
        // 👇 Yahan check kar: "Siddu" zaroor hona chahiye
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
    res.send("✅ Database seeded! Siddu is ready in Jibhi.");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
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

    // 🔍 SEARCH LOGIC (Ye part critical hai)
    if (search) {
      console.log("Searching for:", search); // Terminal mein check karna ye print ho rha hai kya
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },       // Name match
        { location: { $regex: search, $options: 'i' } },   // Location match
        { mustTryDishes: { $regex: search, $options: 'i' } } // ✅ Dish match
      ];
    }

    const places = await Place.find(filter);
    console.log(`Found ${places.length} places`); // Ye bhi print hoga
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
    if (!place) return res.status(404).json({ message: "Place nahi mili bhai" });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { seedDatabase, getPlaces, getPlaceById };