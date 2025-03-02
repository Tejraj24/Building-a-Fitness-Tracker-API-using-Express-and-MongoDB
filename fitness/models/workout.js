const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: { type: String, required: true },
    workout: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true }
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
