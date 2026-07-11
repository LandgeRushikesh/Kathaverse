const CreateStoryPage = () => {
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
                >
                  <option>Technology</option>
                  <option>Fiction</option>
                  <option>Motivation</option>
                  <option>Education</option>
                  <option>Lifestyle</option>
                </select>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="cover-image-url"
                  className="block text-sm font-medium text-slate-700"
                >
                  Cover Image URL
                </label>
                <input
                  id="cover-image-url"
                  type="url"
                  placeholder="Paste cover image URL"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
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
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
              >
                Publish Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
