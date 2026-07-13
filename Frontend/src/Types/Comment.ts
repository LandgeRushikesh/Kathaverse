interface User {
  id: string;
  name: string;
  profilePicture: string;
}
export interface CommentType {
  id: string;
  user: User;
  story: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
