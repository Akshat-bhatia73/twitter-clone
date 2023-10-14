import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"
import { PostData } from "./use-get-posts"

const useGetUserPosts = (userid: string) => {
    const [userPosts, setUserPosts] = useState<PostData[] | null>(null)
    const [postsloading, setPostsLoading] = useState(false)

    const getUserPosts = async (userid: string) => {
        setPostsLoading(true)
        const q = query(collection(db, "posts"), where("userId", "==", userid), orderBy("createdAt", "desc"))
        onSnapshot(q, (querySnap) => {
            const userPosts: PostData[] = []

            querySnap.forEach((doc) => {
                const docData = doc.data()

                userPosts.push({
                    userId: docData.userId,
                    postId: doc.id,
                    comments: docData.comments,
                    commentsIds: docData.commentsIds,
                    likes: docData.likes,
                    body: docData.body,
                    createdAt: docData.createdAt
                })
            })

            setUserPosts(userPosts)
        })
        setPostsLoading(false)
    }

    useEffect(() => {
        getUserPosts(userid)

        return () => { setUserPosts(null) }
    }, [])
    return { userPosts, postsloading }
}

export default useGetUserPosts