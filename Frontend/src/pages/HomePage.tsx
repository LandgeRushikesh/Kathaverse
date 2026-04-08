import { useEffect, useState } from "react";
import { getAllStories } from "../services/StoryService";
import type { Story } from "../Types/Story";
import StoryList from "../components/Story/StoryList";

const HomePage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const limit: number = 5;

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

  const isPrevDisabled = currPage === 1;
  const isNextDisabled = currPage === totalPages;

  return (
    <>
      <div>
        {loading ? <h1>Loading....</h1> : <StoryList stories={stories} />}
      </div>
      <div className="flex justify-center gap-6 mt-6">
        <button
          disabled={isPrevDisabled}
          onClick={handlePrev}
          className={`px-4 py-2 rounded-md transition ${
            isPrevDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>

        <button
          disabled={isNextDisabled}
          onClick={handleNext}
          className={`px-4 py-2 rounded-md transition ${
            isNextDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;
