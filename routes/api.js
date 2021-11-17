const router = require("express").Router();
const db = require("../models/exerciseModel");

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addfields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                }
            }
        }
    ])
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        })
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addfields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                }
            }
        }
    ])
        .sort({_id: -1})
        .limit(7)
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        })
});

