import { Category } from "./Category";

export interface MicroCmsPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  categories: { id: string; name: string }[];
  thumbnailUrl: { url: string; height: number; width: number };
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  postCategories: { category: Category }[];
  thumbnailUrl: string;
}
