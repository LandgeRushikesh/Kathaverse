import type { Story } from "../../Types/Story";

interface storyCardProps {
  story: Story;
}

const StoryCard = ({ story }: storyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md max-w-sm mx-auto hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <img
        src={story.coverImage || "https://wallpaperaccess.com/full/381000.jpg"}
        alt={story.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {story.title}
        </h2>
        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">{story.author.name}</span>
          <span className="mx-2">•</span>
          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
        </div>
        <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-3">
          {story.overview}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium">{story.likeCount} likes</span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
