const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// Create a new workout (POST)
router.post('/', async (req, res) => {
    const { user, workout, duration, caloriesBurned, date } = req.body;

    
    if (!user || !workout || !duration || !caloriesBurned || !date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newWorkout = new Workout({
            user,
            workout,
            duration,
            caloriesBurned,
            date: new Date(date)  // Ensure date is in proper format
        });
        const savedWorkout = await newWorkout.save();
        res.status(201).json({ message: "Workout added successfully", data: savedWorkout });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all workouts (GET)
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find();
        if (workouts.length === 0) {
            return res.json({ message: "No workouts found" });
        }
        res.json({ message: "Workouts retrieved successfully", data: workouts });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user, workout, duration, caloriesBurned, date } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(id, {
            user,
            workout,
            duration,
            caloriesBurned,
            date: new Date(date)
        }, { new: true });

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.json({ message: "Workout updated successfully", data: updatedWorkout });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a workout (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
