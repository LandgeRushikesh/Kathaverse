import express from 'express'
import { createStory, getAllStories, getOneStory, getStoriesOfParticularAuthor } from '../Controller/StoryController/StoryController.js'
import { protect } from '../middleware/AuthMiddleware.js'
import { toggleLike } from '../Controller/LikeController/LikeController.js'
import { addComment, deleteComment, getAllComments } from '../Controller/CommentController/CommentController.js'

const Router = express.Router()

// get all stories
Router.get("/", getAllStories)

// get all stories from Particular author
Router.get("/user/:authorId", getStoriesOfParticularAuthor)

// get story by id
Router.get("/:id", getOneStory)

// Create Story
Router.post("/", protect, createStory)

// Like Route

// Toggle Like
Router.post("/:id/like", protect, toggleLike)


// Comment Routes

// Add Comment
Router.post("/:id/comment", protect, addComment)

// Get All Comments of particular story
Router.get("/:id/comments", getAllComments)

// Delete Comment
Router.delete("/comment/:id", protect, deleteComment)

export default Router;