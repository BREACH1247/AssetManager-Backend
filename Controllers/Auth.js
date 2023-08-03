const User = require('../Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async(req,res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
      } catch (err) {
        res.status(500).json({ message: 'Error registering user.', error: err.message });
      }
}
const login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'password.' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid username' });
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, 'Sidharth', {
          expiresIn: '3h',
        });
        res.json({ token });
      } catch (err) {
        res.status(500).json({ message: 'Error logging in.', error: err.message });
      }
}

module.exports = {
    signup,login
}