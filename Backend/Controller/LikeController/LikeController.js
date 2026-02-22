import asynHandler from 'express-async-handler'
import { Like } from '../../Models/LikeModel.js'
import { Story } from '../../Models/StoryModel.js'


// @route POST /api/stories/:id/like
// @desc Toggel like
// @access Private
export const toggleLike = asynHandler(async (req, res) => {
    const storyId = req.params.id
    const userId = req.user._id

    // Check if story exists
    const storyExists = await Story.exists({ _id: storyId })
    // this will return document like{_id:nbasdnd9932934} if story exists else null if story doesn't exists it is lightweight than using findById which return full story document

    if (!storyExists) {
        res.status(404)
        throw new Error("Story not found")
    }

    // Check if like exists
    const existingLike = await Like.findOne({ user: userId, story: storyId })

    let updatedStory
    // if like exists
    if (existingLike) {
        await Like.deleteOne({ story: storyId, user: userId })

        updatedStory = await Story.findByIdAndUpdate(
            storyId,
            { $inc: { likeCount: -1 } },
            { returnDocument: "after" }
        )

        return res.status(200).json({
            liked: false,
            likeCount: updatedStory.likeCount
        })
    }

    // if like doesn't exists
    await Like.create({
        story: storyId,
        user: userId
    })
    updatedStory = await Story.findByIdAndUpdate(
        storyId,
        { $inc: { likeCount: 1 } },
        { returnDocument: "after" }
    )

    res.status(200).json({
        liked: true,
        likeCount: updatedStory.likeCount
    })
})