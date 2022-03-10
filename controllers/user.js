const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const { LocalStorage } = require('node-localstorage');
const User = require('../models/user');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const user = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(`User ${user.name} not added due to ${error}`);
  }
};

// @desc    Fetch users
// @route   GET /api/users
// @access  Public

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send();
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send(`User ${email} not found`);
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (password !== decryptedPassword) {
      return res.status(401).send('Wrong password');
    }
    // On Successful Login
    // Save JWT in local storage
    let localStorage;
    if (typeof localStorage === 'undefined' || localStorage === null) {
      localStorage = new LocalStorage('./scratch');
      localStorage.setItem('instaLoginToken', generateToken(user._id));
    }
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: 'successfully logged in',
      savedToken: localStorage.getItem('instaLoginToken'),
    });
  } catch (error) {
    res.status(500).send(`User  not logged in due to ${error}`);
  }
};

module.exports = {
  registerUser,
  getUsers,
  loginUser,
};
