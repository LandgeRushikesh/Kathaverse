import asyncHandler from 'express-async-handler'
import { Story } from '../../Models/StoryModel.js'
import { Comment } from '../../Models/CommentModel.js'

// @route POST /api/stories/:id/comment
// @desc add comment
// @access Private

export const addComment = asyncHandler(async (req, res) => {

    const storyId = req.params.id
    const userId = req.user._id

    const story = await Story.exists({ _id: storyId })

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }

    const content = req.body.content?.trim()//if user sends "       " and we don't trim DB will store empty comment that's why we need to trim content here which will make "      "--->""

    if (!content) {
        res.status(400)
        throw new Error("Please add comment")
    }

    const comment = await Comment.create({
        user: userId,
        story: storyId,
        content
    })

    const updatedStory = await Story.findByIdAndUpdate(
        storyId,
        { $inc: { commentCount: 1 } },
        { returnDocument: "after" }
    )

    const response = await comment.populate("user", "name profilePicture")

    res.status(201).json({
        comment: response,
        commentCount: updatedStory.commentCount
    })
})


// @route GET /api/stories/:id/comments
// @desc Get all comments for particular story
// @access Public

export const getAllComments = asyncHandler(async (req, res) => {
    const storyId = req.params.id

    const story = await Story.exists({ _id: storyId })

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }

    const comments = await Comment.find({ story: storyId }).sort({ "createdAt": -1 }).populate("user", "name profilePicture")

    res.status(200).json({
        comments: comments,
        totalComments: comments.length
    })
}) 