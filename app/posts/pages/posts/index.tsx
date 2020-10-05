import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import PostList from "app/posts/components/PostList"


const PostsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Posts</title>
      </Head>
      <main>
        <br />
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <PostList />
        </Suspense>
        <br />
        <br />
      </main>
    </div>
  )
}

PostsPage.getLayout = (page) => <Layout title={"Posts"}>{page}</Layout>

export default PostsPage
