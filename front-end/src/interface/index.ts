export interface User {
  _id: string;
  fullname: string;
  avatar: string;
  email: string;
  blogs?: string[];
  comments?: string[];
  type: string;
}

export interface Blog {
  _id: string;
  title: string;
  banner: string;
  description: string;
  content: string;
  view_count: number;
  slug: string;
  likes?: string[] | User[];
  like_count: number;
  comments?: string[] | User[];
  comment_count: number;
  author: User;
  createdAt: string;
  category: string | Category;
}

export interface Comment {
  author: string | User;
  blog: string | Blog;
  content: string;
  parent?: string | User;
  children?: string[] | User[];
  likes: string[] | User[];
  like_count: number;
}

export interface Category {
  name: string;
  description: string;
  blogs?: string[] | Blog[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalPage: number;
  total?: number;
}

export interface ResponseType {
  errCode: number;
  message: string;
  data:
    | null
    | User
    | User[]
    | Blog
    | Blog[]
    | Category
    | Category[]
    | Comment
    | Comment[];
  token?: string;
  pagination?: Pagination;
}
