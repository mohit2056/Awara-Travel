const Place = require('../models/Place');

// 🛠️ Controller 1: Database Seed karna (Coordinates ke saath)
const seedDatabase = async (req, res) => {
  try {
    await Place.deleteMany({});
    const places = [
      {
        name: "Varkala Cliff",
        description: "India ka apna Bali. Red cliffs aur samundar ka anokha sangam.",
        location: "Kerala",
        coordinates: { lat: 8.7379, lng: 76.7163 }, // ✅ Added
        images: ["https://images.unsplash.com/photo-1688867115849-f1d6d4fa04ac?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        moodTags: ["Peace", "Romantic"],
        isHiddenGem: true,
        avgCost: 8000,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        mustTryDishes: ["Prawn Curry", "Coconut Water"],
      },
      {
        name: "Baga Beach",
        description: "Full party vibes, loud music, aur crowd. Shanti yahan nahi milegi.",
        location: "Goa",
        coordinates: { lat: 15.5553, lng: 73.7517 }, // ✅ Added
        images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2"],
        moodTags: ["Party", "Thrill"],
        isHiddenGem: false,
        avgCost: 15000,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        mustTryDishes: ["Goan Fish Curry", "Feni"],
      },
      {
        name: "Jibhi",
        description: "Himachal ka chupa hua heera. Lakdi ke ghar aur behosh kar dene wali shanti.",
        location: "Himachal Pradesh",
        coordinates: { lat: 31.6346, lng: 77.3491 }, // ✅ Added
        images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"],
        moodTags: ["Peace", "Thrill", "Spiritual"],
        isHiddenGem: true,
        avgCost: 6000,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        mustTryDishes: ["Siddu", "Trout Fish"],
      },
      {
        name: "Shimla Mall Road",
        description: "Classic hill station lekin ab bahut bheed hoti hai.",
        location: "Himachal Pradesh",
        coordinates: { lat: 31.1048, lng: 77.1734 }, // ✅ Added
        images: ["https://images.unsplash.com/photo-1562649846-ab413ca01712"],
        moodTags: ["Romantic", "Family"],
        isHiddenGem: false,
        avgCost: 10000,
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        mustTryDishes: ["Momos", "Coffee"],
      }
    ];

    await Place.insertMany(places);
    res.send("✅ Database seeded with Coordinates!");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

// 🛠️ Controller 2: Places fetch karna (Filter ke saath)
const getPlaces = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};
    if (type === 'hidden') {
      filter = { isHiddenGem: true };
    }
    const places = await Place.find(filter);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🛠️ Controller 3: Single Place fetch karna (ID se)
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place nahi mili bhai" });
    res.json(place);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Exporting ALL functions
module.exports = { seedDatabase, getPlaces, getPlaceById };