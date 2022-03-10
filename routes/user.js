const express = require('express');

const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/user');

router.post('/register', registerUser);
router.get('/', getUsers);
router.post('/login', loginUser);

module.exports = router;
