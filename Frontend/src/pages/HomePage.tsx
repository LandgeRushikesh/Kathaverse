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

  const topStories = [
    {
      id: "1",
      title: "Building KathaVerse: From Idea to Reality",
      author: "Rushikesh Landge",
      likes: 245,
    },
    {
      id: "2",
      title: "How to Write Engaging Stories That Hook Readers",
      author: "Priya Sharma",
      likes: 198,
    },
    {
      id: "3",
      title: "Designing for Narrative Flow in Web Apps",
      author: "Arjun Patil",
      likes: 150,
    },
    {
      id: "4",
      title: "Delivering Story-Driven Features Incrementally",
      author: "Nisha Rao",
      likes: 120,
    },
    {
      id: "5",
      title: "Scaling Story Content with Serverless Functions",
      author: "Ketan Joshi",
      likes: 98,
    },
    {
      id: "6",
      title: "Scaling Story Content with Serverless Functions",
      author: "Ketan Joshi",
      likes: 98,
    },
    {
      id: "7",
      title: "Scaling Story Content with Serverless Functions",
      author: "Ketan Joshi",
      likes: 98,
    },
  ];

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
      <div className="home-section flex justify-around gap-10 items-start h-full min-h-0">
        <section className="flex flex-col flex-1 min-h-0 h-full">
          <div className="flex-1 min-h-0 overflow-y-auto w-full hide-scrollbar">
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
        </section>
        <aside className="top-stories w-80 min-h-0 px-3 py-4 overflow-y-auto h-full hide-scrollbar bg-white border border-slate-100 rounded-xl shadow-md">
          {/* Static top stories (no design) */}
          {/** Replace with real data later */}
          <div>
            <h2 className="text-base font-medium mb-3 text-slate-600">
              Trending on KathaVerse
            </h2>
            <ul>
              {topStories.map((s, idx) => (
                <li key={s.id} className="mb-3">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group block rounded-xl p-3 transition-all duration-200 hover:bg-slate-100 focus:outline-none focus:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-10 flex items-start justify-center">
                        <div className="text-3xl leading-none font-semibold text-slate-500 opacity-80">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-semibold text-gray-900 leading-tight"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {s.title}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {s.author} • {s.likes} Likes
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default HomePage;
