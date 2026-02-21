import asyncHandler from 'express-async-handler'
import { Story } from '../../Models/StoryModel.js'

// @route /api/stories/
// @desc get all stroies
// @method GET
// @access Public
export const getAllStories = asyncHandler(async (req, res) => {
    const stories = await Story.find().select("title overview author coverImage category likeCount createdAt").sort({ createdAt: -1 }).populate("author", "name profilePicture")
    // this will always return an empty array if we didn't find any story

    res.status(200).json(stories)
})

// @route /api/stories/
// @desc get all stroies from particular author
// @method GET
// @access Public
export const getStoriesOfParticularAuthor = asyncHandler(async (req, res) => {
    const authorId = req.params.authorId

    const stories = await Story.find({ author: authorId })
        .select("title overview category coverImage likeCount createdAt author")
        .sort({ createdAt: -1 })
        .populate("author", "name profilePicture")
    res.status(200).json(stories)
})

// @route /api/stories/
// @desc get all stroies
// @method GET
// @access Public
export const getOneStory = asyncHandler(async (req, res) => {
    const id = req.params.id

    const story = await Story.findById(id).populate("author", "name profilePicture bio")

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }
    res.status(200).json(story)
})

// @route /api/stories/
// @desc get all stroies
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

    const reqStory = await Story.findById(story._id).select("title overview author category createdAt likeCount").populate("author", "name profilePicture")

    res.status(201).json(reqStory)
})