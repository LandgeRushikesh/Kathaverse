import { useEffect, useState } from "react";
import { toggleLike } from "../services/LikeService";

const useLike = (
  storyId: string,
  initialIsLiked: boolean,
  initialLikeCount: number,
) => {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const handleLike = async () => {
    if (isLiking) {
      return;
    }
    setIsLiking(true);
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
      const res = await toggleLike(storyId);

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
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  return { isLiked, likeCount, isLiking, handleLike };
};

export default useLike;
