interface User {
  _id: string;
  name: string;
  profilePicture: string;
}
export interface CommentType {
  _id: string;
  user: User;
  story: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
