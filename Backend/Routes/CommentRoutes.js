import express from 'express'
import { protect } from '../middleware/AuthMiddleware.js'
import { deleteComment, updateComment } from '../Controller/CommentController/CommentController.js'

const Router = express.Router()

// Delete Comment
Router.delete("/:id", protect, deleteComment)

// Update Comment
Router.put("/:id", protect, updateComment)

export default Router