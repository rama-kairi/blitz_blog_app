import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage, Link, useSession, useQuery } from "blitz"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"
import AuthorPostList from "../components/AuthorPostList"



const PostsPage: BlitzPage = () => {
    const user = useSession().userId


    return (
        <div>
            <Head>
                <title>Posts</title>
            </Head>

            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                </Suspense>
                <br />
                <div className="welcome">
                    <Suspense fallback={<div>Loading...</div>}>
                        <h3 className="user_welcome">Welcome <span className="wel">{user}</span></h3>
                    </Suspense>
                    <Link href="posts/new">
                        <a className="create">Create New Blog</a>
                    </Link>
                </div>

                <br />
                <br />
                <Suspense fallback={<div>Loading...</div>}>
                    <AuthorPostList />
                </Suspense>
                <br />
                <br />

                <Footer />
            </main>
        </div >
    )
}

PostsPage.getLayout = (page) => <Layout title={"Posts"}>{page}</Layout>

export default PostsPage
