import asyncHandler from 'express-async-handler'
import { Story } from '../../Models/StoryModel.js'
import { Like } from '../../Models/LikeModel.js'

// @route /api/stories/
// @desc get all stroies
// @method GET
// @access Public
export const getAllStories = asyncHandler(async (req, res) => {
    let stories = await Story.find().select("title overview author coverImage category likeCount createdAt").sort({ createdAt: -1 }).populate("author", "name profilePicture").lean()
    // lean() will convert mongoDB object to JS plain object
    // this will always return an empty array if we didn't find any story

    if (!req.user) {
        stories = stories.map((story) => ({
            ...story,
            isLiked: false
        })
        )
    }
    else {
        const storyIds = stories.map(story => story._id)

        const likeStories = await Like.find({
            user: req.user._id,
            story: { $in: storyIds }
        }).select("story").lean()

        const likeStoryIds = new Set(likeStories.map(like => like.story.toString()))

        stories = stories.map(story => ({
            ...story,
            isLiked: likeStoryIds.has(story._id.toString())
        }))
    }
    res.status(200).json(stories)
})

// @route /api/stories/
// @desc get all stroies from particular author
// @method GET
// @access Public
export const getStoriesOfParticularAuthor = asyncHandler(async (req, res) => {
    const authorId = req.params.authorId

    let stories = await Story.find({ author: authorId })
        .select("title overview category coverImage likeCount createdAt author")
        .sort({ createdAt: -1 })
        .populate("author", "name profilePicture")
        .lean()

    if (!req.user) {
        stories = stories.map((story) => ({
            ...story,
            isLiked: false
        })
        )
    }
    else {
        const storyIds = stories.map(story => story._id)

        const likeStories = await Like.find({
            user: req.user._id,
            story: { $in: storyIds }
        }).select("story").lean()

        const likeStoryIds = new Set(likeStories.map(like => like.story.toString()))

        stories = stories.map(story => ({
            ...story,
            isLiked: likeStoryIds.has(story._id.toString())
        }))
    }

    res.status(200).json(stories)
})

// @route /api/stories/:id
// @desc get particular story
// @method GET
// @access Public
export const getOneStory = asyncHandler(async (req, res) => {
    const id = req.params.id

    const story = await Story.findById(id).populate("author", "name profilePicture bio").lean()

    if (!story) {
        res.status(404)
        throw new Error("Story not found")
    }
    if (!req.user) {
        story.isLiked = false
    }
    else {
        const isLiked = await Like.exists({ user: req.user._id, story: story._id })
        console.log(isLiked);

        story.isLiked = isLiked ? true : false
    }
    res.status(200).json(story)
})

// @route /api/stories/
// @desc add stroy
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