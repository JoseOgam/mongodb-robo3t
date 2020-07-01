var mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("password cannot contain passwoed");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  var user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  var user = await User.findOne({ email });
  if (!user) {
    throw new Error("unable to login");
  }
  var isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("wrong passwords");
  }
  return user;
};
userSchema.methods.generateToken = async function () {
  var user = this;
  var token = jwt.sign({ _id: user._id.toString() }, "nodejsapp");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//create models
var User = mongoose.model("User", userSchema);

module.exports = User;
