import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import Header from "app/posts/components/Header"
import Footer from "app/posts/components/Footer"
import SinglePost from "app/posts/components/SinglePost"




const ShowPostPage: BlitzPage = () => {


  return (
    <div>
      <Head>
        <title>Post</title>
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <br />
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <SinglePost />
        </Suspense>
        <br />
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

ShowPostPage.getLayout = (page) => <Layout title={"Post"}>{page}</Layout>

export default ShowPostPage
