const Place = require('../models/Place');

// 🛠️ Controller 1: Database Seeding
const seedDatabase = async (req, res) => {
  try {
    await Place.deleteMany({});
    const places = [
      {
        name: "Varkala Cliff",
        description: "India ka apna Bali. Red cliffs aur samundar ka anokha sangam.",
        location: "Kerala",
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
        images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2"],
        moodTags: ["Party", "Thrill"],
        isHiddenGem: false,
        avgCost: 15000,
        musicUrl: "",
        mustTryDishes: ["Goan Fish Curry", "Feni"],
      },
      {
        name: "Jibhi",
        description: "Himachal ka chupa hua heera. Lakdi ke ghar aur behosh kar dene wali shanti.",
        location: "Himachal Pradesh",
        images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"],
        moodTags: ["Peace", "Thrill", "Spiritual"],
        isHiddenGem: true,
        avgCost: 6000,
        musicUrl: "",
        mustTryDishes: ["Siddu", "Trout Fish"],
      },
      {
        name: "Shimla Mall Road",
        description: "Classic hill station lekin ab bahut bheed hoti hai.",
        location: "Himachal Pradesh",
        images: ["https://images.unsplash.com/photo-1562649846-ab413ca01712"],
        moodTags: ["Romantic", "Family"],
        isHiddenGem: false,
        avgCost: 10000,
        musicUrl: "",
        mustTryDishes: ["Momos", "Coffee"],
      }
    ];
    await Place.insertMany(places);
    res.send("✅ Database seeded successfully!");
  } catch (error) {
    res.status(500).send("Error seeding database: " + error.message);
  }
};

// 🛠️ Controller 2: Places fetching
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

module.exports = { seedDatabase, getPlaces };