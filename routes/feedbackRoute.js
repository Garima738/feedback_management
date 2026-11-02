
const express = require('express');
const router = express.Router();

const Feedback = require('../model/feedbackSchema');
const asyncHandler = require('../util/asynchandler');


router.post('/', asyncHandler(async (req, res) => {

    const { studentName, courseName, message, rating } = req.body;

    if (!studentName || !courseName || !message ||
        rating === undefined || rating === null || rating === '') {

        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    if (Number(rating) < 1 || Number(rating) > 5 ||
        !Number.isInteger(Number(rating))) {

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


router.get('/', asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const sanitizePage = page < 1 ? 1 : page;
    const sanitizeLimit = limit < 1 ? 10 : limit;

    const skip = (sanitizePage - 1) * sanitizeLimit;

    const feedback = await Feedback.find()
        .skip(skip)
        .limit(sanitizeLimit);

    const totalRecords = await Feedback.countDocuments();

    res.status(200).json({
        success: true,
        currentPage: sanitizePage,
        totalRecords: totalRecords,
        data: feedback
    });

}));


router.patch('/:id', asyncHandler(async (req, res) => {

    const { status } = req.body;

    if (!status || (status !== 'Pending' && status !== 'Reviewed')) {
        return res.status(400).json({
            success: false,
            message: 'Status must be Pending or Reviewed'
        });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
        req.params.id,
        { status: status },
        { new: true, runValidators: true }
    );

    if (!updatedFeedback) {
        return res.status(404).json({
            success: false,
            message: 'Feedback not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Feedback status updated successfully',
        feedback: updatedFeedback
    });

}));




module.exports = router;
