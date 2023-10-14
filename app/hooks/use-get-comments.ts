import { collection, doc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/firebase"

export type Comments = {
    author: string,
    postId: string,
    commentBody: string,
    commentId: string,
    createdAt: any,
}

const useGetComments = (postId: string) => {
    const [comments, setComments] = useState<Comments[] | null>(null)
    const [commentsLoading, setLoading] = useState<boolean>(false)
    const getComments = async (postId: string) => {
        setLoading(true)
        const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"))
        onSnapshot(q, (querSnap) => {
            const comments: Comments[] = []
            querSnap.forEach((doc) => {
                const data = doc.data()
                comments.push({
                    commentBody: data.commentBody,
                    commentId: data.commentId,
                    author: data.author,
                    postId: data.postId,
                    createdAt: data.createdAt,
                })
            })
            setComments(comments)
        })
        setLoading(false)
    }

    useEffect(() => {
        getComments(postId)
    }, [])

    return { comments, commentsLoading }
}

export default useGetComments