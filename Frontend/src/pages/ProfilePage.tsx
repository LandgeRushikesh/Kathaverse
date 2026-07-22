import {
  HiOutlineLink,
  HiOutlineLocationMarker,
  HiOutlineMail,
} from "react-icons/hi";

const ProfilePage = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_35%)]" />
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="relative flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl shadow-slate-900/20">
                  <img
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-semibold">Aarya Sharma</div>
                  <div className="text-sm text-slate-200">@aaryasharma</div>
                  <div className="max-w-xl text-sm leading-6 text-slate-100/85">
                    Storyteller, design enthusiast, and digital creator building
                    immersive narrative experiences for readers and writers.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="rounded-2xl bg-white/10 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20">
                  Edit profile
                </button>
                <button className="rounded-2xl bg-slate-100 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                  Share profile
                </button>
                <span className="rounded-2xl bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
                  Pro creator
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <div className="grid grid-cols-3 gap-4 rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/50">
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900">348</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Stories
                </div>
              </div>
              <div className="text-center border-x border-slate-200 px-4">
                <div className="text-lg font-semibold text-slate-900">
                  12.9K
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-slate-900">1.2K</div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Following
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/50">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Top genre
                </div>
                <div className="mt-3 text-xl font-semibold text-slate-900">
                  Fantasy
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/50">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Avg reads
                </div>
                <div className="mt-3 text-xl font-semibold text-slate-900">
                  8.4K
                </div>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/50">
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
                  Response rate
                </div>
                <div className="mt-3 text-xl font-semibold text-slate-900">
                  96%
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">About</h2>
            <p className="text-sm leading-6 text-slate-600">
              Strategic storyteller with a focus on modern fiction and
              UX-friendly publishing. Passionate about building communities
              around short stories, creative writing, and narrative design.
            </p>
          </div>

          <div className="space-y-3 rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center gap-3 text-slate-700">
              <HiOutlineMail className="h-5 w-5" />
              <span className="text-sm">aarya@kathaverse.com</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <HiOutlineLocationMarker className="h-5 w-5" />
              <span className="text-sm">Bengaluru, India</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <HiOutlineLink className="h-5 w-5" />
              <span className="text-sm text-slate-500">
                kathaverse.com/aarya
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Highlights
            </h3>
            <div className="grid gap-3">
              {[
                "Reader of the month",
                "Featured on StoryLab",
                "Collaborated with 16 authors",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Latest stories
            </h2>
            <p className="text-sm text-slate-500">
              A curated view of your recent creative work.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm shadow-slate-200/30">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Profile active
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-md hover:shadow-slate-300/40"
            >
              <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
                <span>Fiction</span>
                <span>2d ago</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Moonlit Whispers
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A short story about hidden promises, city lights, and the quiet
                power of first impressions.
              </p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <span>124 likes</span>
                <span>58 comments</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
