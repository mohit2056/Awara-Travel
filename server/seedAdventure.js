const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Place = require('./models/Place');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 MongoDB Connected...'))
  .catch((err) => console.log(err));

// 👇 15 FRESH CARDS (Direct Image Links)
const adventurePlaces = [
  {
    title: "River Rafting in Rishikesh",
    location: "Rishikesh, Uttarakhand",
    description: "Battle the roaring rapids of the Ganges! 16km Shivpuri to Nim Beach stretch.",
    // 👇 Maine har tarah se image field daal diya hai taaki frontend break na ho
    image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80"],
    price: 1500,
    rating: 4.8
  },
  {
    title: "Paragliding in Bir Billing",
    location: "Bir Billing, Himachal Pradesh",
    description: "Fly from the world's second-highest site. 15-20 mins tandem flight.",
    image: "https://images.unsplash.com/photo-1445543949271-353f15a9151b?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1445543949271-353f15a9151b?w=800&q=80"],
    price: 3500,
    rating: 4.9
  },
  {
    title: "Scuba Diving in Andaman",
    location: "Havelock Island, Andaman",
    description: "Explore the vibrant coral reefs. Includes training and one dive.",
    image: "https://images.unsplash.com/photo-1544551763-46a42a461d12?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1544551763-46a42a461d12?w=800&q=80"],
    price: 4500,
    rating: 4.7
  },
  {
    title: "Skiing in Gulmarg",
    location: "Gulmarg, Kashmir",
    description: "Phase 1 Gondola ride + Basic Skiing Instructor for a day.",
    image: "https://images.unsplash.com/photo-1551524559-8af4e66a3239?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1551524559-8af4e66a3239?w=800&q=80"],
    price: 4000,
    rating: 4.6
  },
  {
    title: "Chadar Trek (Frozen River)",
    location: "Ladakh",
    description: "9-Day trek on the frozen Zanskar River. The ultimate endurance test.",
    image: "https://images.unsplash.com/photo-1624821568478-f71691a5e1d5?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1624821568478-f71691a5e1d5?w=800&q=80"],
    price: 28500,
    rating: 4.9
  },
  {
    title: "Bungee Jumping",
    location: "Rishikesh, Uttarakhand",
    description: "India's highest fixed platform (83m). Jumpin Heights standard rate.",
    image: "https://images.unsplash.com/photo-1521330784804-039c065f3775?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1521330784804-039c065f3775?w=800&q=80"],
    price: 3700,
    rating: 4.8
  },
  {
    title: "Desert Jeep Safari",
    location: "Jaisalmer, Rajasthan",
    description: "4x4 Jeep bashing on Sam Sand Dunes + Sunset view.",
    image: "https://images.unsplash.com/photo-1539656722240-621819779df3?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1539656722240-621819779df3?w=800&q=80"],
    price: 2500,
    rating: 4.5
  },
  {
    title: "Caving Expedition",
    location: "Cherrapunji, Meghalaya",
    description: "Explore the ancient Krem Mawmluh caves with professional guides.",
    image: "https://images.unsplash.com/photo-1506543169018-b2a3d077b943?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1506543169018-b2a3d077b943?w=800&q=80"],
    price: 3000,
    rating: 4.6
  },
  {
    title: "Hot Air Balloon Ride",
    location: "Jaipur, Rajasthan",
    description: "60-minute flight over forts and palaces. Premium experience.",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800&q=80"],
    price: 15000,
    rating: 4.7
  },
  {
    title: "Surfing Lessons",
    location: "Varkala, Kerala",
    description: "Beginner surfing lesson (90 mins) on the cliffs of Varkala.",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80"],
    price: 2000,
    rating: 4.4
  },
  {
    title: "Bamboo Rafting",
    location: "Thekkady, Kerala",
    description: "Full day rafting + trekking in Periyar Tiger Reserve. Includes food.",
    image: "https://images.unsplash.com/photo-1596423736737-18d45f49e89d?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1596423736737-18d45f49e89d?w=800&q=80"],
    price: 2000,
    rating: 4.3
  },
  {
    title: "Tiger Safari",
    location: "Ranthambore, Rajasthan",
    description: "Gypsy Safari in Core Zones (Zone 1-5). High chance of sighting.",
    image: "https://images.unsplash.com/photo-1550541797-152e93d93740?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1550541797-152e93d93740?w=800&q=80"],
    price: 2200,
    rating: 4.8
  },
  {
    title: "Waterfall Rappelling",
    location: "Coorg, Karnataka",
    description: "Rappel down the Chelavara waterfalls. Thrilling and refreshing.",
    image: "https://images.unsplash.com/photo-1599554319522-68c4d2d61994?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1599554319522-68c4d2d61994?w=800&q=80"],
    price: 1200,
    rating: 4.5
  },
  {
    title: "Skydiving",
    location: "Mysore, Karnataka",
    description: "Jump from 10,000 feet! The ultimate bucket list item.",
    image: "https://images.unsplash.com/photo-1529522409747-81b4dc5a2ad0?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1529522409747-81b4dc5a2ad0?w=800&q=80"],
    price: 35000,
    rating: 5.0
  },
  {
    title: "Leh Bike Trip",
    location: "Manali to Leh",
    description: "10-Day Bike Trip package including stay, food, and mechanic support.",
    image: "https://images.unsplash.com/photo-1582200236058-29362776c533?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1582200236058-29362776c533?w=800&q=80"],
    price: 29999,
    rating: 4.9
  }
];

const seedDB = async () => {
  try {
    let user = await User.findOne({});
    if (!user) {
      console.log("Creating new Admin User...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456", salt);
      user = await User.create({ username: "AdminBoss", email: "admin@awara.com", password: hashedPassword });
    }

    // 1️⃣ DELETE ALL ADVENTURE & EXTREME SPORTS (Purana sara kachra saaf)
    await Place.deleteMany({ category: { $in: ['Adventure', 'Extreme Sports'] } });
    console.log("🧹 Deleted all duplicates/old data.");

    // 2️⃣ INSERT NEW DATA
    const placesWithDetails = adventurePlaces.map(place => ({
      owner: user._id, 
      name: place.title,        
      location: place.location, 
      avgCost: place.price,     
      coordinates: { lat: 28.6139, lng: 77.2090 },
      
      // 👇 Images ke liye teen fields daal raha hu, koi na koi to pakka chalega
      image: place.image,       
      images: place.images,
      photos: place.images,     

      description: place.description,
      perks: ["Extreme", "Safety Gear", "Guide"],
      extraInfo: "Carry valid ID proof",
      checkIn: 12, checkOut: 11, maxGuests: 10,
      
      category: "Extreme Sports", 
      rating: place.rating
    }));

    await Place.insertMany(placesWithDetails);
    console.log("✅ 15 FRESH & CLEAN cards added! Images fixed.");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedDB();