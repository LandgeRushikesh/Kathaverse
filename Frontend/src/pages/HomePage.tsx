import { useEffect, useState } from "react";
import { getAllStories } from "../services/StoryService";
import type { Story } from "../Types/Story";
import StoryList from "../components/Story/StoryList";

const HomePage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  let limit: number = 5;

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await getAllStories(currPage, limit);

      setStories(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.error("Failed to Fetch Stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currPage < totalPages) {
      setCurrPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchStories();
  }, [currPage]);

  return (
    <>
      <div>
        {loading ? <h1>Loading....</h1> : <StoryList stories={stories} />}
      </div>
      <div className="btn flex justify-around">
        <button onClick={handlePrev} className="cursor-pointer">
          Prev
        </button>
        <button onClick={handleNext} className="cursor-pointer">
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;
