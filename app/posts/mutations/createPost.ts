import { SessionContext } from "blitz"
import db, { PostCreateArgs } from "db"

type CreatePostInput = {
  data: PostCreateArgs["data"]
}
export default async function createPost(
  { data }: CreatePostInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const post = await db.post.create({ data })

  return post
}
