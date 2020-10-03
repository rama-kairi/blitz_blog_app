import { Link, useParam, useQuery, useRouter, useSession } from 'blitz'
import styles from './AuthorPostList.module.scss'
import getPosts from '../queries/getPostsAll'
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import deletePost from '../mutations/deletePost'



const AuthorPostList = () => {
    const router = useRouter()
    const userid = useCurrentUser()
    const [{ posts }] = useQuery(getPosts, { where: { userId: userid?.id } })

    return (
        <div className={styles.blog_container}>

            { posts.map((post) => (
                <div className={styles.blogCard}>
                    <div className={styles.cardHeader}>
                        <img src={post.imageUrl} alt="image_Sample" className={styles.blogImg} />
                        <div className={styles.meta}>
                            <span className={styles.badge1}>Ramananda kairi</span>
                            <span className={styles.badge2}>{post.createdAt.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className={styles.card_content}>
                        <h2 className={styles.blogHeader}>{post.title}</h2>
                        <p className={styles.blogPara}>{post.description}</p>
                    </div>
                    <div className="action">
                        <Link href="/posts/[postId]/edit" as={`/posts/${post.id}/edit`}>
                            <a className="edit">Edit</a>
                        </Link>

                        <button
                            className="delete"
                            type="button"
                            onClick={async () => {
                                if (window.confirm("This will be deleted")) {
                                    await deletePost({ where: { id: post.id } })
                                    router.push("/author")
                                }
                            }}>
                            Delete
                        </button>

                    </div>
                </div>))}
        </div>
    )
}

export default AuthorPostList
