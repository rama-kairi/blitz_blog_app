import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import SinglePost from "app/posts/components/SinglePost"




const ShowPostPage: BlitzPage = () => {


  return (
    <div>
      <Head>
        <title>Post</title>
      </Head>

      <main>
        <br />
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <SinglePost />
        </Suspense>
        <br />
        <br />
        <br />
      </main>
    </div>
  )
}

ShowPostPage.getLayout = (page) => <Layout title={"Post"}>{page}</Layout>

export default ShowPostPage
