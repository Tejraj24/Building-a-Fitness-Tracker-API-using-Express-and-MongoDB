const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workout');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/workout', workoutRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
