const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Wishlist Logic
  wishlist: [{
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    },
    note: {
      type: String,
      default: "" 
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ⚠️ YAHAN GOR KARO: (bracket khali hai, 'next' nahi likhna hai)
userSchema.pre('save', async function () {
  
  // 1. Agar password change nahi hua, toh yahin se wapas jao
  if (!this.isModified('password')) {
    return;
  }

  // 2. Password Encrypt karo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // ❌ 'next()' call mat karna, kyunki ye Async function hai
});

module.exports = mongoose.model('User', userSchema);