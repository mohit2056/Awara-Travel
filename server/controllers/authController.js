const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Token Generate Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// 1. Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  // Create User
  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// 2. Login User
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// 3. Toggle Wishlist (Add/Remove)
const toggleWishlist = async (req, res) => {
  const { placeId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    const existingItemIndex = user.wishlist.findIndex(
      (item) => item.place.toString() === placeId
    );

    if (existingItemIndex !== -1) {
      // Remove
      user.wishlist.splice(existingItemIndex, 1);
      await user.save();
      // Populate karke bhejo taaki frontend turant update ho
      await user.populate('wishlist.place');
      res.status(200).json({ message: 'Removed from Wishlist 💔', wishlist: user.wishlist });
    } else {
      // Add
      user.wishlist.push({ place: placeId, note: '' });
      await user.save();
      await user.populate('wishlist.place');
      res.status(200).json({ message: 'Added to Wishlist ❤️', wishlist: user.wishlist });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// ⭐ 4. Get Wishlist
const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist.place');
  if (user) {
    // Filter out null places (agar koi place delete ho gayi ho database se)
    const validWishlist = user.wishlist.filter(item => item.place !== null);
    res.json(validWishlist);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// 5. Update Wishlist Note (Dream Notes)
const updateWishlistNote = async (req, res) => {
  const { placeId, note } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    // Dhyan rakhna: item.place database mein ObjectId hota hai, isliye .toString() zaroori hai
    const item = user.wishlist.find((item) => item.place.toString() === placeId);
    if (item) {
      item.note = note; // Update Note
      await user.save();
      res.status(200).json({ message: 'Note Saved! 📝' });
    } else {
      res.status(404).json({ message: 'Place not found in wishlist' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// ✅ EXPORTS: Ensure karna ye 5 naam yahan hon
module.exports = { 
    registerUser, 
    authUser, 
    toggleWishlist, 
    getWishlist, 
    updateWishlistNote 
};