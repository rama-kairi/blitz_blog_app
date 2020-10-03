import { SessionContext } from "blitz"
import db, { PostUpdateArgs } from "db"

type UpdatePostInput = {
  where: PostUpdateArgs["where"]
  data: PostUpdateArgs["data"]
}

export default async function updatePost(
  { where, data }: UpdatePostInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const post = await db.post.update({ where, data })

  return post
}
