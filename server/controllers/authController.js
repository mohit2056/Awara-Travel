const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

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

// ⭐ 3. Forgot Password (STABLE RENDER CONFIG)
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    // 📨 Daakiya (Transporter) Setup - Updated for Stability
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 👈 Gmail service use karna best hai
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, // 👈 Apna 16-digit App Password use karein
      },
      // Render par network errors se bachne ke liye extra settings:
      pool: true,
      maxConnections: 1,
      socketTimeout: 20000, // 20 seconds
      connectionTimeout: 20000,
    });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

    const mailOptions = {
      from: `"Awara Travel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Awara Travel 🔒',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #6b21a8;">Awara Password Reset</h2>
          <p>Hi ${user.username},</p>
          <p>You requested a password reset. Click the button below to set a new password:</p>
          <a href="${clientUrl}/reset-password/${user._id}" style="background: #6b21a8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Reset Password</a>
          <p style="margin-top: 20px; color: #777; font-size: 12px;">Link valid for 10 minutes only.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully! Check your inbox." });

  } catch (error) {
    console.error("Email Error Details:", error);
    res.status(500).json({ message: "Server could not send email. Please try again later." });
  }
};

// 4. Toggle Wishlist (Add/Remove)
const toggleWishlist = async (req, res) => {
  const { placeId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (!user.wishlist) user.wishlist = [];

    const existingItemIndex = user.wishlist.findIndex(
      (item) => item.place.toString() === placeId
    );

    if (existingItemIndex !== -1) {
      user.wishlist.splice(existingItemIndex, 1);
      await user.save();
      await user.populate('wishlist.place'); 
      res.status(200).json({ message: 'Removed from Wishlist 💔', wishlist: user.wishlist });
    } else {
      user.wishlist.push({ place: placeId, note: '' });
      await user.save();
      await user.populate('wishlist.place');
      res.status(200).json({ message: 'Added to Wishlist ❤️', wishlist: user.wishlist });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// 5. Get Wishlist
const getWishlist = async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist.place');
  if (user) {
    const validWishlist = user.wishlist ? user.wishlist.filter(item => item.place !== null) : [];
    res.json(validWishlist);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// 6. Update Wishlist Note
const updateWishlistNote = async (req, res) => {
  const { placeId, note } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    const item = user.wishlist.find((item) => item.place.toString() === placeId);
    if (item) {
      item.note = note;
      await user.save();
      res.status(200).json({ message: 'Note Saved! 📝' });
    } else {
      res.status(404).json({ message: 'Place not found in wishlist' });
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// ⭐ 7. RESET PASSWORD FUNCTION
const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password; // Middleware will hash it if set up in Schema
    await user.save();

    res.status(200).json({ message: "Password updated successfully! Login now." });
  } catch (error) {
    res.status(500).json({ message: "Server error during password reset" });
  }
};

module.exports = { 
  registerUser, 
  authUser, 
  forgotPassword, 
  resetPassword,
  toggleWishlist, 
  getWishlist, 
  updateWishlistNote 
};
