const bcrypt = require('bcryptjs');
const { createUser, findByEmail, findById } = require('../models/userModel');
const { signToken } = require('../utils/jwt');

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const existing = await findByEmail(email.toLowerCase());
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email: email.toLowerCase(), passwordHash });
    const token = signToken({ id: user.id, email: user.email });

    return res.status(201).json({ token, user });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await findByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const safeUser = await findById(user.id);
    const token = signToken({ id: safeUser.id, email: safeUser.email });
    return res.json({ token, user: safeUser });
  } catch (err) {
    return next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signup, login, me };
