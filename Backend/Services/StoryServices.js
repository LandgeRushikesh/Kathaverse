import { Follow } from "../Models/FollowModel.js"
import { Like } from "../Models/LikeModel.js"

export const enrichStories = async (user, stories) => {
    let single = false

    // if stories is not an array
    if (!Array.isArray(stories)) {
        stories = [stories]
        single = true
    }

    // if stories is empty
    if (stories.length === 0) {
        return single ? null : []
    }

    // if not user
    if (!user) {
        const enriched = stories.map(s => ({
            ...s,
            isLiked: false,
            isFollowing: false
        }))

        return single ? enriched[0] : enriched
    }

    // Collect Ids
    const storyIds = stories.map(story => story._id)
    const authorIds = stories.map(story => story.author && typeof (story.author) === "object" ? story.author._id : story.author)//if controller does not populate author object and it also check if story.author!==null as story.author= null then it's type will be object

    // Query like
    const likeStories = await Like.find({
        user: user._id,
        story: { $in: storyIds }
    }).select("story").lean()

    // query follows
    const followedAuthor = await Follow.find({
        follower: user._id,
        following: { $in: authorIds }
    }).select("following").lean()

    // Convert to Set for O(1) lookup
    const likeStoryIds = new Set(likeStories.map(s => s.story.toString()))
    const followedAuthorIds = new Set(followedAuthor.map(f => f.following.toString()))

    // Enrich Stories
    const enriched = stories.map(story => {
        const authorId = story.author && typeof (story.author) === "object" ? story.author._id : story.author

        return {
            ...story,
            isLiked: likeStoryIds.has(story._id.toString()),
            isFollowing: authorId ? followedAuthorIds.has(authorId.toString()) : false
        }
    })

    return single ? enriched[0] : enriched
}