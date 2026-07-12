interface Author {
  _id: string;
  name: string;
  profilePicture: null;
}

export interface Story {
  _id: string;
  title: string;
  author: Author;
  overview: string;
  likeCount: number;
  isLiked: boolean;
  isFollowing: boolean;
  createdAt: string;
  coverImage: string;
  category: string;
}

export interface DetailedStoryContent {
  _id: string;
  title: string;
  overview: string;
  content: string;
  coverImage: string;
  category: string;

  likeCount: number;
  commentCount: number;

  isLiked: boolean;
  isFollowing: boolean;

  createdAt: string;
  updatedAt: string;

  author: {
    _id: string;
    name: string;
    bio: string;
    profilePicture: string | null;
  };
}

export interface CreateStoryRequest {
  title: string;
  overview: string;
  content: string;
  category: string;
  coverImage: string;
}
