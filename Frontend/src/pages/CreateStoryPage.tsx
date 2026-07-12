import { useState } from "react";
import type { CreateStoryRequest } from "../Types/Story";
import { createStory } from "../services/StoryService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadImage } from "../services/UploadImageService";

const CreateStoryPage = () => {
  const [storyData, setStoryData] = useState<CreateStoryRequest>({
    title: "",
    overview: "",
    content: "",
    category: "",
    coverImage: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<{
    message: string | null;
    isError: boolean;
  }>({
    message: null,
    isError: false,
  });
  const navigate = useNavigate();

  const handlePublish = async () => {
    try {
      if (!storyData.title.trim()) {
        toast.error("Title is required");
        return;
      }
      if (!storyData.overview.trim()) {
        toast.error("Overview is required");
        return;
      }
      if (!storyData.content.trim()) {
        toast.error("Content is required");
        return;
      }
      if (!storyData.category.trim()) {
        toast.error("Category is required");
        return;
      }
      if (!storyData.coverImage.trim()) {
        toast.error("CoverImage is required");
        return;
      }
      setIsLoading(true);
      await createStory(storyData);

      toast.success("Story Published Successfully...");

      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (error) {
      console.error("Error Occured:", error);
      toast.error("Failed to publish Story");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setStoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];

      if (!file) {
        return;
      }
      setUploadStatus({
        message: "Uploading Image...",
        isError: false,
      });
      setIsUploading(true);
      const res = await uploadImage(file);
      setStoryData((prev) => ({
        ...prev,
        coverImage: res.imageUrl,
      }));
      setUploadStatus({
        message: "Image uploaded successfully",
        isError: false,
      });
    } catch (error) {
      toast.error("Failed to upload Image");
      console.error("Failed to upload image:", error);
      setUploadStatus({
        message: "Failed to upload image",
        isError: true,
      });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="max-h-full overflow-y-auto hide-scrollbar bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Create story
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Publish your next great story
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Share your ideas with readers using a polished, distraction-free
              editor layout.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label
                htmlFor="story-title"
                className="block text-sm font-medium text-slate-700"
              >
                Story Title
              </label>
              <input
                id="story-title"
                type="text"
                placeholder="Enter story title"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                name="title"
                value={storyData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="story-overview"
                  className="text-sm font-medium text-slate-700"
                >
                  Overview / Short Description
                </label>
                <span className="text-xs text-slate-400">Optional</span>
              </div>
              <textarea
                id="story-overview"
                placeholder="Write a short overview of your story"
                rows={4}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                name="overview"
                value={storyData.overview}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="story-content"
                className="block text-sm font-medium text-slate-700"
              >
                Story Content
              </label>
              <textarea
                id="story-content"
                placeholder="Write your story here..."
                rows={12}
                className="w-full rounded-3xl border border-slate-300 bg-white px-5 py-4 text-base text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                name="content"
                value={storyData.content}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <label
                  htmlFor="story-category"
                  className="block text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  id="story-category"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  name="category"
                  value={storyData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Motivation">Motivation</option>
                  <option value="Education">Education</option>
                  <option value="Lifestyle">Lifestyle</option>
                </select>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="cover-image"
                  className="block text-sm font-medium text-slate-700"
                >
                  Cover Image
                </label>
                <input
                  id="cover-image"
                  type="file"
                  accept="image/*" //This tells the browser to show only image files in the file picker.
                  disabled={isUploading}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer"
                  onChange={handleImageChange}
                />
                {uploadStatus.message && (
                  <p
                    className={`mt-2 text-sm ${uploadStatus.isError ? "text-red-500" : "text-green-600"}`}
                  >
                    {uploadStatus.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Ready to publish?
                </p>
                <p className="text-sm text-slate-500">
                  Your story will be visible once it is published.
                </p>
              </div>
              <button
                type="button"
                disabled={isLoading || isUploading}
                className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-slate-300 ${isLoading || isUploading ? "bg-slate-300 text-slate-600 cursor-not-allowed" : "bg-slate-900 text-white hover:bg-slate-800"}`}
                onClick={handlePublish}
              >
                {isLoading
                  ? "Publishing..."
                  : isUploading
                    ? "Uploading Image..."
                    : "Publish Story"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
