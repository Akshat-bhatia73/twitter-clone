import { PostData } from "@/app/hooks/use-get-posts";
import { useEffect } from "react";
import Post from "./Post";

const Posts = ({ posts }: { posts: PostData[] | null }) => {
  useEffect(() => {}, [posts]);
  return (
    <div className="flex flex-col">
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post.postId}
              userId={post.userId}
              postId={post.postId}
              comments={post.comments}
              likes={post.likes}
              commentsIds={post.commentsIds}
              body={post.body}
              createdAt={post.createdAt}
            />
          );
        })}
    </div>
  );
};

export default Posts;
