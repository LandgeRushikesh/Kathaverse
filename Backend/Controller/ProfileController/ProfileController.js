import asyncHandler from 'express-async-handler'
import { User } from '../../Models/UserModel.js'
import { Story } from '../../Models/StoryModel.js'
import { Follow } from '../../Models/FollowModel.js'
import { isValidObjectId } from '../../utils/isValidObjectId.js'

// @route GET /api/users/:id
// @desc Get requested users Profile
// @access Public

export const getProfile = asyncHandler(async (req, res) => {
    const userId = req.params?.id

    if (!isValidObjectId(userId)) {
        res.status(400)
        throw new Error("Valid userId is required")
    }

    const profile = await User.findById(userId).select("name profilePicture bio followerCount followingCount createdAt").lean()//using lean() this will convert it into plain JS object from mongoDB object
    /* this is a mongoDB object it is not a plain JS Object so below what i am trying profile.totalStories = totalStories is not possible to add new fileds in this object we need convert this mongoDB object to JS Plain Object
    to do so we have 2 options 
    1. profileObj = profile.toObject()
    2. use lean() which directly converts mongoDB object to plain JS object
    
    */

    if (!profile) {
        res.status(404)
        throw new Error("User not found")
    }

    // let profileObj = profile.toObject()//this is one Option

    const totalStories = await Story.countDocuments({ author: userId })

    profile.totalStories = totalStories


    let isFollowing = false

    if (req.user) {
        const follow = await Follow.exists({ follower: req.user._id, following: userId })
        if (follow) {
            isFollowing = true
        }
    }

    profile.isFollowing = isFollowing

    res.status(200).json(profile)
})