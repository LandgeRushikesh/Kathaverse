import type { Story } from "../../Types/Story";
import StoryCard from "./StoryCard";

interface StoryListProps {
  stories: Story[];
}

const StoryList = ({ stories }: StoryListProps) => {
  return (
    <div className="flex flex-col space-y-6 w-full">
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;
