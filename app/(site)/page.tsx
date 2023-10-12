"use client";
import CreatePost from "@/app/components/CreatePost";
import Posts from "../components/Posts";
import { useAuthContext } from "../context/AuthContext";
import useGetPosts from "../hooks/use-get-posts";

export default function Home() {
  const { currentUser } = useAuthContext();
  const { posts } = useGetPosts();

  return (
    <div className="mt-6">
      {currentUser && <CreatePost />}
      <Posts posts={posts} />
    </div>
  );
}
