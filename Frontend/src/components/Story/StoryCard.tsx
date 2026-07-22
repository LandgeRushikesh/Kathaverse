import type { Story } from "../../Types/Story";
import { useNavigate } from "react-router-dom";
import useLike from "../../hooks/useLike";

interface storyCardProps {
  story: Story;
}

const StoryCard = ({ story }: storyCardProps) => {
  const navigate = useNavigate();

  const { isLiked, likeCount, isLiking, handleLike } = useLike(
    story._id,
    story.isLiked,
    story.likeCount,
  );

  const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await handleLike();
  };

  const handleNavigation = (id: string) => {
    navigate(`/story/${id}`);
  };

  return (
    <div
      onClick={() => handleNavigation(story._id)}
      className="bg-white rounded-lg shadow-md w-full hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden bg-gray-200">
        <div className="absolute inset-0">
          <img
            src={
              story.coverImage || "https://wallpaperaccess.com/full/381000.jpg"
            }
            alt={story.title}
            className="w-full h-full object-cover object-center opacity-30 blur-xs"
          />
        </div>
        <div className="relative flex items-center justify-center h-56">
          <img
            src={
              story.coverImage || "https://wallpaperaccess.com/full/381000.jpg"
            }
            alt={story.title}
            className="max-w-full max-h-full object-contain object-center"
          />
        </div>
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
              onClick={handleLikeClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 active:scale-95 ${isLiking ? "cursor-not-allowed" : "cursor-pointerhover:text-red-500"}`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
