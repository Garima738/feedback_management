const express = require('express');
const router = express.Router();

const Feedback = require('../model/feedbackSchema');
const asyncHandler = require('../util/asynchandler');


router.post('/api/feedback', asyncHandler(async (req, res) => {
    const { studentName, courseName, message, rating } = req.body;

    if (!studentName  ||
        ! courseName  ||
       ! message ||
        rating === undefined || rating === null || rating === '') {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    if (Number(rating) < 1 || Number(rating) > 5 || !Number.isInteger(Number(rating))) {
        return res.status(400).json({
            success: false,
            message: 'Rating must be between 1 and 5'
        });
    }

    const newFeedback = await Feedback.create({
        studentName: studentName.trim(),
        courseName: courseName.trim(),
        message: message.trim(),
        rating: Number(rating)
    });

    res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully',
        feedback: newFeedback
    });
}));

