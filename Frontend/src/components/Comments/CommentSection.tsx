import { useEffect, useState } from "react";
import { fetchComments, postComment } from "../../services/CommentService";
import type { CommentType } from "../../Types/Comment";
import toast from "react-hot-toast";

interface CommentSectionProps {
  storyId: string;
}
const CommentSection = ({ storyId }: CommentSectionProps) => {
  // i have to do this because props are passed as object so we to define its Type like this
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>("");
  const [currPage, setCurrPage] = useState<number>(1);
  const limit: number = 5;

  // loading states
  const [loading, setLoading] = useState<boolean>(false);
  const [posting, setPosting] = useState<boolean>(false);

  useEffect(() => {
    getComments(storyId);
  }, [storyId, currPage]);

  const getComments = async (storyId: string) => {
    try {
      setLoading(true);
      const res = await fetchComments(storyId, currPage, limit);
      setComments((prev) => [...(prev ?? []), ...res.data]);
      setTotalComments(res.pagination.total);
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
      await postComment(storyId, userComment);

      setUserComment("");
      await getComments(storyId);
    } catch (error) {
      console.error("Error Occurred:", error);
    } finally {
      setPosting(false);
    }
  };

  const handleLoadMore = () => {
    if (currPage == totalPages) {
      setTotalPages(currPage);
    } else {
      setCurrPage(currPage + 1);
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
          {totalComments} responses
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
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
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
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {comment.content}
              </p>
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
