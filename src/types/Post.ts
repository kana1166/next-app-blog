/** @format */

import { Category } from "@/types/Category";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  postCategories: { category: Category }[];
  thumbnailUrl: string;
  thumbnailImageKey?: string;
}
