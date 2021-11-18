const express = require("express");
const router = express.Router();
const db = require("../models/exerciseModel");
const path = require('path');

router.get('/exercise', (req,res) => {
    res.sendFile(path.join(__dirname, '/../public/exercise.html'));
})

router.get('/api/workouts', (req, res) => {
    db.aggregate([
        {
            $addFields: {
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

router.post("/api/workouts", (req, res) => {
    db.create({
      day: new Date(new Date().setDate(new Date().getDate())),
      exercises: [],
    })
      .then((created) => {
        res.json(created);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.put('/api/workouts/:id', ({body, params}, res) => {
    db.findByIdAndUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true}
    )
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.json(err);
        })
});

router.get('/api/workouts/range', (req, res) => {
    db.aggregate([
        {
            $addFields: {
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

router.delete('/api/workouts', ({body}, res) => {
    db.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);
    })
})

router.get('/stats', (req, res) => {
    res.redirect('/stats.html')
})

module.exports = router;