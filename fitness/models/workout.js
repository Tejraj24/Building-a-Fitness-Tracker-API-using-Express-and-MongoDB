const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: { type: String, required: true }, // User's name or ID
    exercise: { type: String, required: true }, // Exercise name
    duration: { type: Number, required: true }, // Duration in minutes
    caloriesBurned: { type: Number, required: true }, // Calories burned
    date: { type: Date, default: Date.now } // Default to current date
});

module.exports = mongoose.model('Workout', workoutSchema);
