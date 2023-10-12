import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"

export type PostData = {
    postId: string,
    userId: string,
    body: string,
    comments: number,
    likes: number,
    createdAt: any,
    commentsIds: string[]
}
const useGetPosts = () => {
    const [posts, setPosts] = useState<PostData[] | null>(null)

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
        onSnapshot(q, (qSnap) => {
            const posts: PostData[] = []

            qSnap.forEach((post) => {
                const postData = post.data()
                posts.push({
                    postId: post.id,
                    userId: postData.userId,
                    body: postData.body,
                    comments: postData.comments,
                    likes: postData.likes,
                    createdAt: postData.createdAt,
                    commentsIds: postData.commentsids
                })
            })
            setPosts(posts)
        })
    }, [])

    return { posts }
}

export default useGetPosts