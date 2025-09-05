const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// 🔹 SIGNUP
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sequelize syntax
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ 
      message: 'Signup successful', 
      user: { id: user.id, email: user.email }, 
      token 
    });
  } catch (err) {
    console.error('🔴 Error in signup:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔹 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Use Sequelize
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("🔴 Error in login:", err);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// 🔹 GOOGLE LOGIN
exports.googleLogin = async (req, res) => {
  try {
    const { email, googleId, name } = req.body;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, googleId, firstname: name || '' });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Google login successful',
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        contact: user.contact,
      },
      token,
    });
  } catch (err) {
    console.error('🔴 Error in googleLogin:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔹 GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'firstname', 'lastname', 'username', 'contact'],
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('🔴 Error in getProfile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔹 UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { id, firstname, lastname, username, contact, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    user.contact = contact || user.contact;

    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({
      message: 'Profile updated successfully',
      user: { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, username: user.username, contact: user.contact },
    });
  } catch (err) {
    console.error('🔴 Error in updateProfile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};




/*exports.googleLogin = async (req, res) => {
  try {
    const { email, googleId, name } = req.body;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, googleId, firstname: name || '' });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      message: 'Google login successful',
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        contact: user.contact,
      },
      token,
    });
  } catch (err) {
    console.error('🔴 Error in googleLogin:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

exports.getProfile = async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'firstname', 'lastname', 'username', 'contact'],
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('🔴 Error in getProfile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id, firstname, lastname, username, contact, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    user.contact = contact || user.contact;

    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({
      message: 'Profile updated successfully',
      user: { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, username: user.username, contact: user.contact },
    });
  } catch (err) {
    console.error('🔴 Error in updateProfile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};*/
