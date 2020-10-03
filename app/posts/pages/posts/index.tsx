import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"
import PostList from "app/posts/components/PostList"


const PostsPage: BlitzPage = () => {
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
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <PostList />
        </Suspense>
        <br />
        <br />

        <Footer />
      </main>
    </div>
  )
}

PostsPage.getLayout = (page) => <Layout title={"Posts"}>{page}</Layout>

export default PostsPage
