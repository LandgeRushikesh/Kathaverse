import { useEffect, useState } from "react";
import type { Story } from "../../Types/Story";
import { toggleLike } from "../../services/LikeService";

interface storyCardProps {
  story: Story;
}

const StoryCard = ({ story }: storyCardProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(story.isLiked);
  const [likeCount, setLikeCount] = useState<number>(story.likeCount);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const handleLike = async () => {
    setIsLiking(true);
    const id = story._id;
    // Previous state
    const prevLiked: boolean = isLiked;
    const prevCount: number = likeCount;
    // Toggle like
    setIsLiked((prevIsLiked) => {
      const newIsLiked = !prevIsLiked;
      setLikeCount((prevCount) => (newIsLiked ? prevCount + 1 : prevCount - 1));

      return newIsLiked;
    });

    try {
      const res = await toggleLike(id);

      setIsLiked(res.isLiked);
      setLikeCount(res.likeCount);
    } catch (error) {
      console.error("Failed to like:", error);
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
    } finally {
      setIsLiking(false);
    }
  };

  // this is for when prop will change as react doesn't reinitialized states when re-rendered
  useEffect(() => {
    setIsLiked(story.isLiked);
    setLikeCount(story.likeCount);
  }, [story.isLiked, story.likeCount]);

  return (
    <div className="bg-white rounded-lg shadow-md max-w-sm mx-auto hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative overflow-hidden bg-gray-200">
        <img
          src={
            story.coverImage || "https://wallpaperaccess.com/full/381000.jpg"
          }
          alt={story.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col grow">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
          {story.title}
        </h2>

        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium text-gray-800">{story.author.name}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500">
            {new Date(story.createdAt).toLocaleDateString()}
          </span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 grow">
          {story.overview}
        </p>

        {/* Interaction Footer */}
        <div className="border-t border-gray-100 pt-3 mt-auto">
          <div className="flex items-center justify-between">
            {/* Like Button & Count */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 active:scale-95 ${isLiking ? "cursor-not-allowed" : "cursor-pointer"}`}
              aria-label={isLiked ? "Unlike story" : "Like story"}
              disabled={isLiking}
            >
              {/* Heart Icon */}
              <svg
                className={`w-5 h-5 transition-all duration-200 ${
                  isLiked
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-400 hover:text-red-500"
                }`}
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span
                className={`text-sm font-semibold transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-600"
                }`}
              >
                {likeCount}
              </span>
            </button>

            {/* Additional Social Actions */}
            <div className="flex items-center gap-1">
              {/* Comment Icon */}
              <button
                className="p-2 rounded-lg hover:bg-blue-50 transition-colors text-gray-400 hover:text-blue-500"
                aria-label="Comment on story"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </button>

              {/* Share Icon */}
              <button
                className="p-2 rounded-lg hover:bg-green-50 transition-colors text-gray-400 hover:text-green-500"
                aria-label="Share story"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C9.577 14.714 10.685 15.881 11.997 16.714m0 0c1.312-.834 2.42-2.001 3.313-3.372m-9.573-2.16a9.003 9.003 0 019.573-2.16m0 0a8.968 8.968 0 013.313 3.372m-9.573 2.16l-3.066-3.066a9 9 0 1312.728 0l-3.066 3.066m0 0l3.066 3.066"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
