import React from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createPost from "app/posts/mutations/createPost"
import PostForm from "app/posts/components/PostForm"

const NewPostPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Post</title>
      </Head>

      <main>
        <h1 className="create">Create New Post</h1>

        <PostForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const post = await createPost({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(post))
              router.push("/posts/[postId]", `/posts/${post.id}`)
            } catch (error) {
              alert("Error creating post " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

NewPostPage.getLayout = (page) => <Layout title={"Create New Post"}>{page}</Layout>

export default NewPostPage
