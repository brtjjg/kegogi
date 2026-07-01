require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use('/uploads', express.static('uploads')); // Serve static images

// Import Routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const specialistRoutes = require('./routes/specialists');
const commitmentRoutes = require('./routes/commitment');
const galleryRoutes = require('./routes/gallery');
const settingsRoutes = require('./routes/settings');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/specialists', specialistRoutes);
app.use('/api/commitment', commitmentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log('❌ DB Connection Error:', err));
