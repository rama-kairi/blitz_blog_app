import getPost from "app/posts/queries/getPost"
import { useParam, useQuery } from "blitz"

const SinglePost = () => {

    const postId = useParam("postId", "number")
    const [post] = useQuery(getPost, { where: { id: postId } })
    return (
        <div className="singlePost">
            <img src={post.imageUrl} alt={post.title} />
            <h2 className="heading">{post.title}</h2>
            <h3>Posted By (User Id) : {post.userId}</h3>
            <p>{post.description}</p>
        </div>
    )
}

export default SinglePost
