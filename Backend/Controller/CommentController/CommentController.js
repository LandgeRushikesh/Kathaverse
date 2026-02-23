import asyncHandler from 'express-async-handler'
import { Story } from '../../Models/StoryModel.js'
import { Comment } from '../../Models/CommentModel.js'

// @route POST /api/stories/:id/comments
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

// @route DELETE /api/comment/:id
// @desc delete particular comment
// @access Private

export const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id
    const userId = req.user._id

    const comment = await Comment.findById(commentId).select("user story")

    // Check if comment exists
    if (!comment) {
        res.status(404)
        throw new Error("Comment not found")
    }

    // Check if user is allowed to delete this comment
    if (comment.user.toString() !== userId.toString()) {
        res.status(403)
        throw new Error("You are not allowed to delete this comment")
    }

    // Delete comment
    await Comment.findByIdAndDelete(commentId)
    // as we have already fetch the comment we can also do like below
    // await comment.deleteOne()

    // update comment count in  story
    const updatedStory = await Story.findByIdAndUpdate(
        comment.story,
        { $inc: { commentCount: -1 } },
        { returnDocument: "after" }
    )

    res.status(200).json({
        message: "Comment Deleted Successfully",
        commentCount: updatedStory.commentCount
    })
})

// @route PUT /api/comments/:id
// @desc Update particular comment
// @access Private

export const updateComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id
    const userId = req.user._id

    const comment = await Comment.findById(commentId)

    // Check whether comment exists
    if (!comment) {
        res.status(404)
        throw new Error("Comment not found")
    }

    // check if user is allowed to update comment
    if (comment.user.toString() !== userId.toString()) {
        res.status(403)
        throw new Error("You are not allowed to update this comment")
    }

    const content = req.body.content?.trim()

    if (!content) {
        res.status(400)
        throw new Error("Please add updated comment")
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content: content },
        { returnDocument: "after" }
    )

    res.status(200).json(updatedComment)
})