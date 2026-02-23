import asyncHandler from 'express-async-handler'
import { Follow } from '../../Models/FollowModel.js'
import { User } from '../../Models/UserModel.js'

export const toggleFollowing = asyncHandler(async (req, res) => {
    let user = req.user
    const followerId = user._id
    const followingId = req.params.id

    // Check if person being followed does exists 
    const userExists = await User.exists({ _id: followingId })
    if (!userExists) {
        res.status(404)
        throw new Error("User not found")
    }

    // First check if person being followed is not same to the person who is following
    if (followerId.toString() === followingId.toString()) {
        res.status(400)
        throw new Error("You cannot follow yourself")
    }

    // check if user already follows to requested user
    const follow = await Follow.findOne({ follower: followerId, following: followingId })
    let currentUser;
    let targetUser;

    if (follow) {
        await Follow.findByIdAndDelete(follow._id)
        // we can do this by using follow.deleteOne() as we already fetch the follow document

        currentUser = await User.findByIdAndUpdate(
            followerId,
            { $inc: { followingCount: -1 } },
            { returnDocument: "after" }
        )
        targetUser = await User.findByIdAndUpdate(
            followingId,
            { $inc: { followerCount: -1 } },
            { returnDocument: "after" }
        )

        return res.status(200).json({
            following: false,
            followerCount: targetUser.followerCount
        })
    }

    await Follow.create({
        follower: followerId,
        following: followingId,
    })

    currentUser = await User.findByIdAndUpdate(
        followerId,
        { $inc: { followingCount: 1 } },
        { returnDocument: "after" }
    )
    targetUser = await User.findByIdAndUpdate(
        followingId,
        { $inc: { followerCount: 1 } },
        { returnDocument: "after" }
    )

    res.status(200).json({
        following: true,
        followerCount: targetUser.followerCount
    })
}) 