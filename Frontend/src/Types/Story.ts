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
  coverImage: null;
  category: string;
}

export interface CreateStoryRequest {
  title: string;
  overview: string;
  content: string;
  category: string;
  coverImage: string;
}
