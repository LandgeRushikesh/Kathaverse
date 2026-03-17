import asyncHandler from 'express-async-handler'
import { Story } from '../../Models/StoryModel.js'
import { Like } from '../../Models/LikeModel.js'
import { Follow } from '../../Models/FollowModel.js'
import { enrichStories } from '../../Services/StoryServices.js'
import { Comment } from '../../Models/CommentModel.js'

// @route /api/stories/
// @desc get all stories
// @method GET
// @access Public
export const getAllStories = asyncHandler(async (req, res) => {
    let stories = await Story.find().select("title overview author coverImage category likeCount createdAt").sort({ createdAt: -1 }).populate("author", "name profilePicture").lean()
    // lean() will convert mongoDB object to JS plain object
    // this will always return an empty array if we didn't find any story

    stories = await enrichStories(req.user, stories)
    res.status(200).json({
        success: true,
        data: stories
    })
})

// @route /api/stories/
// @desc get all stories from particular author
// @method GET
// @access Public
export const getStoriesOfParticularAuthor = asyncHandler(async (req, res) => {
    const authorId = req.params.authorId

    let stories = await Story.find({ author: authorId })
        .select("title overview category coverImage likeCount createdAt author")
        .sort({ createdAt: -1 })
        .populate("author", "name profilePicture")
        .lean()

    stories = await enrichStories(req.user, stories)

    res.status(200).json({
        success: true,
        data: stories
    })
})

// @route /api/stories/:id
// @desc get particular story
// @method GET
// @access Public
export const getOneStory = asyncHandler(async (req, res) => {
    const id = req.params.id

    let story = await Story.findById(id).populate("author", "name profilePicture bio").lean()

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }

    story = await enrichStories(req.user, story)
    res.status(200).json({
        success: true,
        data: story
    })
})

// @route /api/stories/
// @desc add story
// @method POST
// @access Private
export const createStory = asyncHandler(async (req, res) => {
    const { title, overview, content } = req.body

    if (!title || !overview || !content) {
        res.status(400)
        throw new Error("Required all fields")
    }

    const authorId = req.user._id

    const story = await Story.create({
        title,
        overview,
        content,
        author: authorId
    })//if it fails it will directly throw an error so we don't need to check whether story is created or not

    let reqStory = await Story.findById(story._id)
        .select("title overview author category createdAt likeCount")
        .populate("author", "name profilePicture")
        .lean()
    reqStory = await enrichStories(req.user, reqStory)
    res.status(201).json({
        success: true,
        data: reqStory
    })
})

// @route /api/stories/:id
// @desc Update Story
// @method PUT
// @access Private

export const updateStory = asyncHandler(async (req, res) => {
    const { id } = req.params

    const story = await Story.findById(id)

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }

    const authorId = req.user._id

    if (story.author.toString() !== authorId.toString()) {
        res.status(403)
        throw new Error("Only author can edit story")
    }

    const { title, content } = req.body

    if (title === undefined && content === undefined) {
        res.status(400)
        throw new Error("No updatable fields provided")
    }

    if (title !== undefined) {
        story.title = title
    }

    if (content !== undefined) {
        story.content = content
    }

    await story.save()

    res.status(200).json({
        success: true,
        message: "Story updated successfully",
        data: story
    })

})


// @route /api/stories/:id
// @desc Delete Story
// @method DELETE
// @access Private

export const deleteStory = asyncHandler(async (req, res) => {
    const { id } = req.params

    const story = await Story.findById(id)

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }

    // Authorization
    const authorId = req.user._id

    if (story.author.toString() !== authorId.toString()) {
        res.status(403)
        throw new Error("Only author can delete story")
    }

    // This allow parallel excution of this cleanup tasks
    await Promise.all([
        // Delete all Comment of this story
        Comment.deleteMany({ story: story._id }),
        // Delete all Likes of this story
        Like.deleteMany({ story: story._id })
    ])

    // Delete a story
    await story.deleteOne()

    res.status(200).json({
        success: true,
        message: "Story deleted successfully",
        data: story
    })
})