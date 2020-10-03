import logout from 'app/auth/mutations/logout';
import { Link, useQuery, useRouter, useSession } from 'blitz'
import styles from './Header.module.scss'




const Header = () => {
    const user = useSession().userId
    const router = useRouter()

    return (
        <div className={styles.header}>
            <Link href="/posts">
                <a className={styles.logo}>Blog App</a>
            </Link>

            <div className={styles.auth_links}>

                {!user ?
                    <div className={styles.links}>
                        <Link href="/signup">
                            <a className={styles.auth_link}>Signup</a>
                        </Link>
                        <Link href="/login">
                            <a className={styles.auth_link}>Login</a>
                        </Link>
                    </div>
                    :
                    <div className="auth">
                        {router.pathname !== "/author" ?
                            <Link href="/author">
                                <a>Author Dashboard</a>
                            </Link> : ""
                        }

                        <button
                            className="button small"
                            onClick={async () => {
                                await logout()
                                router.push("/posts")
                            }}
                        >
                            Logout
                    </button>
                    </div>
                }



            </div>
        </div>
    )
}

export default Header;
