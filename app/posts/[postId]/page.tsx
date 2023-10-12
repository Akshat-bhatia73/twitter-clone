"use client";
import Loader from "@/app/components/Loader";
import PostMain from "@/app/components/PostMain";
import useGetPost from "@/app/hooks/use-get-post";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { post, postLoading } = useGetPost(params.postId);

  return postLoading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : (
    post && (
      <PostMain
        userId={post.userId}
        postId={post.postId}
        comments={post.comments}
        likes={post.likes}
        commentsIds={post.commentsIds}
        body={post.body}
        createdAt={post.createdAt}
      />
    )
  );
};

export default PostPage;
