import { Link, useQuery } from 'blitz'
import styles from './PostList.module.scss'
import getPostAll from '../queries/getPostsAll'


const PostList = () => {
    const [{ posts }] = useQuery(getPostAll, { orderBy: { createdAt: "desc" } })

    return (
        <div className={styles.blog_container}>
            {
                posts.map((post) => (
                    <Link href="/posts/[postId]" as={`/posts/${post.id}`}>
                        <a>
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
                            </div>
                        </a>
                    </Link>
                ))}
        </div>
    )
}

export default PostList
