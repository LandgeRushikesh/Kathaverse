import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../services/ProfileService";
import type { profileType } from "../Types/Profile.ts";
import { useAuth } from "../context/AuthContext.tsx";

const ProfilePage = () => {
  const [profile, setProfile] = useState<profileType | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { id } = useParams();

  const { user } = useAuth();

  const isLoggedInUser: boolean = user?._id === id;

  const profileName = profile?.name || "User";
  const profileUsername = profile?.email ? profile.email.split("@")[0] : "user";
  const profileBio = profile?.bio || "No bio added yet.";
  const profileImage = profile?.profilePicture;
  const profileInitials = profileName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchProfile(id);
  }, [id]);

  useEffect(() => {
    setIsFollowing(Boolean(profile?.isFollowing));
  }, [profile]);

  const fetchProfile = async (userId: string) => {
    try {
      const res = await getUserProfile(userId);
      setProfile(res);
    } catch (error) {
      toast.error("Failed to fetch profile");
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-8">
        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-slate-200 bg-slate-100 shadow-md sm:h-32 sm:w-32">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-500 text-2xl font-semibold text-white sm:text-3xl">
                  {profileInitials}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-5">
            <div className="flex flex-col items-center justify-center gap-4 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  {profileName}
                </h1>
                <p className="text-sm text-slate-500">@{profileUsername}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {isLoggedInUser ? (
                  <button className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Edit profile
                  </button>
                ) : (
                  <button
                    onClick={handleFollowToggle}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isFollowing
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-sky-500 text-white hover:bg-sky-600"
                    }`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
              <div className="min-w-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center sm:text-left">
                <div className="text-lg font-semibold text-slate-900">
                  {profile?.totalStories ?? 0}
                </div>
                <div className="text-sm text-slate-500">Stories</div>
              </div>
              <div className="min-w-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center sm:text-left">
                <div className="text-lg font-semibold text-slate-900">
                  {profile?.followerCount ?? 0}
                </div>
                <div className="text-sm text-slate-500">Followers</div>
              </div>
              <div className="min-w-[90px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center sm:text-left">
                <div className="text-lg font-semibold text-slate-900">
                  {profile?.followingCount ?? 0}
                </div>
                <div className="text-sm text-slate-500">Following</div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center lg:text-left">
              <p className="text-sm font-semibold text-slate-900">
                {profileName}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                {profileBio}
              </p>
              {profile?.email ? (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500 sm:justify-start">
                  <HiOutlineMail className="h-4 w-4" />
                  <span>{profile.email}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Stories</h2>
            <p className="text-sm text-slate-500">
              {profile?.totalStories
                ? `${profile.totalStories} published`
                : "No stories published yet"}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            {profile?.totalStories ? "Active" : "Getting started"}
          </span>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-900">
            {profile?.totalStories
              ? "Your latest stories will appear here."
              : "No stories yet"}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {profile?.totalStories
              ? `You have ${profile.totalStories} story${
                  profile.totalStories === 1 ? "" : "s"
                } ready to share.`
              : "Create your first story to populate this profile."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
