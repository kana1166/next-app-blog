/** @format */

import { Post } from "../../../types/Post";

export const useAdminPosts = async (token: string): Promise<Post[]> => {
  const res = await fetch("/api/admin/posts", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // 👈 Header に token を付与
    },
  });
  const data = await res.json();
  return data.posts;
};
