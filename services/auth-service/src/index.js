const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory user store (replace with MongoDB in production)
let users = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@smartchicken.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    phone: '+91-9999999999',
    role: 'admin',
    addresses: [],
    createdAt: new Date().toISOString(),
  },
];

let otpStore = {};

const JWT_SECRET = process.env.JWT_SECRET || 'smart-chicken-shop-secret-key';

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    users.push(user);

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, addresses: user.addresses },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send OTP
app.post('/api/auth/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    console.log(`📱 OTP for ${phone}: ${otp}`); // In production, send via SMS

    res.json({ message: 'OTP sent successfully', debug_otp: otp }); // Remove debug_otp in production
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const stored = otpStore[phone];
    if (!stored || stored.otp !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }
    if (Date.now() > stored.expiresAt) {
      delete otpStore[phone];
      return res.status(401).json({ error: 'OTP expired' });
    }

    delete otpStore[phone];

    let user = users.find(u => u.phone === phone);
    if (!user) {
      user = {
        id: uuidv4(),
        name: `User ${phone.slice(-4)}`,
        email: '',
        phone,
        role: 'customer',
        addresses: [],
        createdAt: new Date().toISOString(),
      };
      users.push(user);
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
app.get('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, addresses: user.addresses,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update profile
app.put('/api/auth/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.email) user.email = req.body.email;

    res.json({
      id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, addresses: user.addresses,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Add address
app.post('/api/auth/address', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find(u => u.id === decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const address = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
    user.addresses.push(address);

    res.json({ addresses: user.addresses });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔐 Auth Service running on port ${PORT}`);
});

module.exports = app;
