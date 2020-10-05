import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import UpdatePostForm from "app/posts/components/UpdatePostForm"


const EditPostPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Post</title>
      </Head>

      <main>
        <br />
        <br />
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <UpdatePostForm />
        </Suspense>

        <br />
        <br />
        <br />
      </main>
    </div>
  )
}

EditPostPage.getLayout = (page) => <Layout title={"Edit Post"}>{page}</Layout>

export default EditPostPage
