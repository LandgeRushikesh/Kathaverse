import { useEffect, useState } from "react";
import {
  deleteComment,
  editComment,
  fetchComments,
  postComment,
} from "../../services/CommentService";
import type { CommentType } from "../../Types/Comment";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

interface CommentSectionProps {
  storyId: string;
  authorId: string;
  updateCommentCount: (count: number) => void;
  commentCount: number;
}
const CommentSection = ({
  storyId,
  authorId,
  updateCommentCount,
  commentCount,
}: CommentSectionProps) => {
  // i have to do this because props are passed as object so we to define its Type like this
  const [comments, setComments] = useState<CommentType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>("");
  const [editedCommentContent, setEditedCommentContent] = useState<string>("");
  const [currPage, setCurrPage] = useState<number>(1);
  const [editableCommentId, setEditableCommentId] = useState<string | null>(
    null,
  );
  const { user } = useAuth();
  const limit: number = 5;

  // loading states
  const [loading, setLoading] = useState<boolean>(false);
  const [posting, setPosting] = useState<boolean>(false);

  useEffect(() => {
    getComments(storyId);
  }, [storyId, currPage]);

  const getComments = async (storyId: string) => {
    try {
      if (currPage === 1) {
        setLoading(true);
      }
      const res = await fetchComments(storyId, currPage, limit);

      if (currPage === 1) {
        setComments(res.data);
      } else {
        setComments((prev) => [...prev, ...res.data]);
      }
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.error("Error Occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async () => {
    try {
      if (!userComment.trim()) {
        toast.error("Please add a comment");
        return;
      }
      setPosting(true);
      const res = await postComment(storyId, userComment);
      updateCommentCount(res.data.commentCount);

      setUserComment("");
      if (currPage === 1) {
        await getComments(storyId);
      } else {
        setComments([]);
        setCurrPage(1);
      }
    } catch (error) {
      console.error("Error Occurred:", error);
    } finally {
      setPosting(false);
    }
  };

  const handleLoadMore = () => {
    if (currPage === totalPages) {
      return;
    }
    setCurrPage((prev) => prev + 1);
  };

  const handleDeleteComment = async (id: string) => {
    try {
      const res = await deleteComment(id);
      toast.success("Comment deleted successfully");
      setComments((prev) => prev.filter((comment) => comment._id !== id));
      updateCommentCount(res.data.commentCount);
      // if comment is deleted while editing
      if (id === editableCommentId) {
        setEditableCommentId(null);
        setEditedCommentContent("");
      }
    } catch (error) {
      console.error("Error Occurred:", error);
      toast.error("Error while deleting a comment");
    }
  };

  const handleEdit = (id: string, originalContent: string) => {
    setEditableCommentId(id);
    setEditedCommentContent(originalContent);
  };

  const handleEditComment = async (id: string, originalContent: string) => {
    try {
      if (!editedCommentContent?.trim()) {
        toast.error("Comment cannot be empty.");
        return;
      }
      if (originalContent.trim() === editedCommentContent.trim()) {
        setEditableCommentId(null);
        setEditedCommentContent("");
        return;
      }

      const updatedComment = await editComment(id, editedCommentContent);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment,
        ),
      );

      setEditableCommentId(null);
      setEditedCommentContent("");
    } catch (error) {
      console.error("Error Occurred:", error);
      toast.error("Error while updating a comment");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Comments</h2>
          <p className="text-sm text-slate-500">
            See what readers are saying about this story.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
          {commentCount} {commentCount > 1 ? "responses" : "response"}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {loading ? (
          // skeleton placeholders
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                  <div className="h-3 w-1/4 rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-4 h-12 w-full rounded bg-slate-200" />
            </div>
          ))
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment._id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-slate-300 text-sm font-semibold uppercase text-slate-700">
                    {comment.user?.profilePicture ? (
                      <img
                        src={comment.user.profilePicture}
                        alt={comment.user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {comment.user?.name
                          ?.split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {comment.user?.name || "Anonymous"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="flex items-center gap-2">
                  {editableCommentId !== comment._id &&
                    user?._id === comment.user._id && (
                      <button
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
                        onClick={() => handleEdit(comment._id, comment.content)}
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    )}
                  {(user?._id === comment.user._id ||
                    user?._id === authorId) && (
                    <button
                      className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-red-600 cursor-pointer"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              {editableCommentId === comment._id ? (
                <div className="mt-4">
                  <textarea
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    aria-label="Edit comment"
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    autoFocus
                  />

                  <div className="mt-3 flex justify-end">
                    <button
                      className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                      type="button"
                      aria-label="Post updated comment"
                      onClick={() =>
                        handleEditComment(editableCommentId, comment.content)
                      }
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap">
                  {comment.content}
                </p>
              )}
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <p className="text-sm font-semibold text-slate-900">
              No comments yet
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Be the first to share your thoughts about this story.
            </p>
          </div>
        )}
      </div>

      {/* Load more*/}
      {currPage < totalPages && (
        <div className="mt-6 flex justify-center">
          <div
            aria-hidden
            className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 cursor-pointer"
            onClick={handleLoadMore}
          >
            <span>Load more comments</span>
            <svg
              className="h-4 w-4 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.78a.75.75 0 001.06 0L13 10.06a.75.75 0 000-1.06L8.27 4.29a.75.75 0 10-1.06 1.06L11.44 9.5 7.21 13.72a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Add a comment
        </h3>
        <textarea
          className="mt-4 h-28 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          placeholder="Share your thoughts..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          disabled={loading || posting}
        />
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={handlePostComment}
            disabled={posting || loading}
          >
            {posting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Posting...
              </span>
            ) : (
              "Post comment"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
