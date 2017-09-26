
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

  username: {
    type: String,
    // lowercase: true,
    required: [true, "Username cannot be blank."],
    trim: true,
    unique: [true, "There is already a User by that name."],
    minlength: [4, "Minimum of 4 characters required for Username."],
    maxlength: [20, "Maximum of 20 characters allowed for Username."],
    validate: [{
      validator : function (username){
        return /^[a-zA-Z0-9_]+$/.test(username);
      },
      message: 'Username can only contain letters, numbers, and/or underscores.'
    }],
  },

  password: {
    type: String,
    required: [true, "Password fields cannot be blank."],
    trim: true,
    minlength: [8, "Your Password must contain at least 8 characters!"],
    maxlength: [256, "Password cannot excede 256 characters."],
  },

  zip: {
    type: Number,
    required: [true, "Please enter your 5-digit Zip Code."],
    trim: true,
    minlength: [5, "Zip code must be 5 digits."],
    maxlength: [5, "Zip code must be 5 digits."],
    validate: [{
      validator : function (zip){
        return /^[0-9]+$/.test(zip);
      },
      message: 'Must be a 5-digit, numbers-only Zip Code.'
    }],
  },

  _messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message',
  }],

  _comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],

}, { timestamps: true });

userSchema.pre('save',function(next) {
  if(!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

userSchema.methods.passwordMatch = function(password) {
  return this.password === password;
};

userSchema.statics.verifyPassword = function(inputPassword, hashPassword) {
  return bcrypt.compare(inputPassword, hashPassword);
};

module.exports = mongoose.model('User',userSchema);
