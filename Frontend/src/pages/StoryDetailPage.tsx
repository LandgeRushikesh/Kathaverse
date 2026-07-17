import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStoryById } from "../services/StoryService";
import type { DetailedStoryContent } from "../Types/Story.ts";
import CommentSection from "../components/Comments/CommentSection.tsx";
import useLike from "../hooks/useLike.ts";

const StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState<DetailedStoryContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isLiked, likeCount, isLiking, handleLike } = useLike(
    story?._id ?? "",
    story?.isLiked ?? false,
    story?.likeCount ?? 0,
  );

  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setError("Story not found.");
      return;
    }

    fetchStory(id);
  }, [id]);

  const fetchStory = async (storyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getStoryById(storyId);
      setStory(res.data);
    } catch (fetchError) {
      console.error("Error Occurred:", fetchError);
      setError("Unable to load the story. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCommentCount = (count: number) => {
    setStory((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        commentCount: count,
      };
    });
  };

  const handleScrollComment = () => {
    commentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm text-center">
          <p className="text-lg font-semibold text-slate-900">
            Loading story...
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Please wait while we fetch the story details.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="max-w-xl rounded-3xl border border-red-200 bg-white px-8 py-10 shadow-sm text-center">
          <p className="text-lg font-semibold text-red-600">
            Oops! Something went wrong.
          </p>
          <p className="mt-3 text-sm text-slate-500">{error}</p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-sm text-center">
          <p className="text-lg font-semibold text-slate-900">
            Story not available
          </p>
          <p className="mt-3 text-sm text-slate-500">
            The requested story could not be loaded.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <span className="inline-block h-8 w-8 rounded-full bg-slate-100 text-center leading-8 text-slate-600">
            ←
          </span>
          Back to stories
        </Link>
      </div>

      <div className="rounded-4xl overflow-hidden bg-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="relative h-80 sm:h-96">
          <img
            src={story.coverImage}
            alt={story.title}
            className="absolute inset-0 h-full w-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent" />
          <div className="relative flex h-full flex-col justify-end p-6 sm:p-10">
            <span className="w-fit inline-flex rounded-full bg-slate-100/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">
              {story.category || "Uncategorized"}
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {story.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
              {story.overview || "Read the full story below."}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.9fr_0.95fr]">
        <main className="space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
                    onClick={handleLike}
                    disabled={isLiking}
                  >
                    <span
                      className={`text-base ${
                        isLiked ? "text-rose-500" : "text-slate-500"
                      }`}
                    >
                      {isLiked ? "♥" : "♡"}
                    </span>
                    <span>
                      {likeCount} {likeCount > 1 ? "Likes" : "Like"}
                    </span>
                  </button>

                  <button
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 cursor-pointer"
                    onClick={handleScrollComment}
                  >
                    <span className="text-sky-700">💬</span>
                    <span>
                      {story.commentCount}{" "}
                      {story.commentCount > 1 ? "comments" : "comment"}
                    </span>
                  </button>
                </div>
                <p className="text-sm text-slate-500">
                  Published by{" "}
                  <span className="font-semibold text-slate-900">
                    {story.author.name}
                  </span>{" "}
                  • {new Date(story.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6 text-slate-700">
              <p className="text-base leading-8">{story.content}</p>
            </div>
          </section>

          {/* Comment Section */}
          <section
            ref={commentRef}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            {id && (
              <CommentSection
                storyId={id}
                authorId={story.author._id}
                updateCommentCount={updateCommentCount}
                commentCount={story.commentCount}
              />
            )}
          </section>
        </main>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              About the author
            </h3>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-slate-300 text-lg font-semibold uppercase text-slate-900">
                {story.author.profilePicture ? (
                  <img
                    src={story.author.profilePicture}
                    alt={story.author.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {story.author.name
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  {story.author.name}
                </p>
                <p className="text-sm text-slate-500">Author</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              {story.author.bio ||
                "A story author who shares thoughtful writing and polished experiences."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Story details
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li className="flex items-center justify-between">
                <span>Category</span>
                <span className="font-semibold text-slate-900">
                  {story.category || "N/A"}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Likes</span>
                <span className="font-semibold text-slate-900">
                  {likeCount}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Comments</span>
                <span className="font-semibold text-slate-900">
                  {story.commentCount}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Created</span>
                <span className="font-semibold text-slate-900">
                  {new Date(story.createdAt).toLocaleDateString()}
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StoryDetailPage;
