import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { PostData } from "./use-get-posts"

const useGetPost = (postId: string) => {
    const [post, setPost] = useState<PostData | null>(null)
    const [postLoading, setLoading] = useState<boolean>(false)

    const getPost = async () => {
        setLoading(true)
        const postRef = doc(db, "posts", postId)
        onSnapshot(postRef, (postSnap) => {
            if (postSnap.exists()) {
                const postData = postSnap.data()
                setPost({
                    postId: postId,
                    userId: postData.userId,
                    body: postData.body,
                    comments: postData.comments,
                    likes: postData.likes,
                    createdAt: postData.createdAt,
                    commentsIds: postData.commentsids
                })
            }
        })
        setLoading(false)
    }

    useEffect(() => {
        getPost()
    }, [])

    return { post, postLoading }
}

export default useGetPost